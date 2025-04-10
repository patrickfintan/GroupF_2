import { useEffect, useState, useContext, useRef } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context.js";
import '../CSS Folder/WriteStory.css';


function WriteStory() {
    const { userId, setEditedStoryId} = useContext(UserContext); // Fetch userId from context
    const [storyType, setStoryType] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [story, setStory] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [snapshots, setSnapshots] = useState([]);
    //const [links, setLinks] = useState([]);
    //const [newSnapshotText, setNewSnapshotText] = useState("");
    //const [newLinks, setNewLinks] = useState("");
    const location = useLocation();
    const storysent = location.state|| {};
    const [isPublished, setIsPublished] = useState(false); // Track published state
   // const [showPublishButton, setShowPublishButton] = useState(false); // Control visibility of the Publish button
   const storyBox = useRef(null);
   const previousStory = useRef("");
   //const [tempLink, setTempLink] = useState('');
   const [targetSnap, setTargetSnap] = useState([]);
   //const [targetSnapshot, setTargetSnapshot] = useState([]);
   
    
    console.log("userid:", userId);
    useEffect(() => {
        const initializeComponent = async () => {
            if (storysent.storyId) {
                console.log("Editing existing story:", storysent.storyId);
                setEditedStoryId(storysent.storyId);
                try {
                    const response = await axios.get(
                        `http://localhost:5000/api/story/${storysent.storyId}`
                    );
                    const data = response.data;
                    
                    setStoryType(storysent.storyType);
                    setTitle(storysent.title);
                    setSummary(storysent.summary);
                    setStory(data.story);
                    setCoverImage(storysent.coverImage);
                    setIsPublished(storysent.isPublished || false);
                } catch (error) {
                    console.error("Error fetching story:", error);
                }
            } else {
                console.log("No story ID found, initializing as a new story.");
                clearState(); // Reset state explicitly
            }
        };
    
        initializeComponent();

        // Cleanup function to unlock the story when the component unmounts
    },[storysent.storyId]);

    const handleImageUpload = (event) =>{
        setCoverImage(event.target.files[0]);
    };

    const clearState = () => {
        setStoryType("");
        setTitle("");
        setSummary("");
        setStory("");
        setCoverImage(null);
        setSnapshots([]);
        setIsPublished(false);
        //setShowPublishButton(false);
    }; 
  
    const navigate = useNavigate();
    const handleSaveOrPublish = async(publish) => {
        try{

            if (!storyType || !title || !summary || !story) {
                alert("Please fill out all required fields: Story Type, Title, Summary, and Story.");
                return; // Exit the function if validation fails
            } 
            
            const formData = new FormData();
            console.log("Front-end isPublished:", publish); // Log the value before appending
            formData.append("storyType", storyType);
            formData.append("title", title);
            formData.append("summary",summary);
            formData.append("story", story);
            formData.append("isPublished", publish);            
            formData.append("userId", userId);
            formData.append("snapshots", JSON.stringify(snapshots)); // Include snapshots
            console.log(formData);
            if(storysent.storyId){
                console.log(storysent);
                formData.append("coverImage",storysent.coverImage);
                await axios.post(`http://localhost:5000/api/update-story/${storysent.storyId}`,formData);
                alert(isPublished ? "Story published successfully!" : "Story updated successfully!");            
            } else{
                console.log(formData);
                formData.append("coverImage",coverImage);
                //const response = await axios.post("http://localhost:5000/api/save-story",formData);
                alert(!isPublished ? "Story published successfully!" : "Story updated successfully!");           
             }
                
                clearState(); // Clear the state after saving
                navigate("/MyStories");

            }
        catch (error){
            console.error("Error saving story:", error);
        }
    };

    const increaseSnapshots = (index) => {
        const updated = snapshots.map(({ start, end }) => ({
          start: start > index ? start + 1 : start,
          end: end > index ? end + 1 : end
        }));
        setSnapshots(updated);
      };
    
    const decreaseSnapshots = (index) => {
        const updated = snapshots.map(({ start, end }) => ({
          start: start > index ? start - 1 : start,
          end: end > index ? end - 1 : end
        }));
        setSnapshots(updated);
      };

    const handleStoryChange = (e) => {
        const newValue = e.target.value;
        const oldValue = previousStory.current;
      
        let changedIndex = -1;
      
        // Determine if it was an insertion or deletion
        if (newValue.length > oldValue.length) {
          // Character added
          for (let i = 0; i < newValue.length; i++) {
            if (newValue[i] !== oldValue[i]) {
              changedIndex = i;
              console.log(`Character added at index: ${changedIndex}`);

              increaseSnapshots(changedIndex);
            
              break;
            }
          }
        } else if (newValue.length < oldValue.length) {
          // Character deleted
          for (let i = 0; i < oldValue.length; i++) {
            if (newValue[i] !== oldValue[i]) {
              changedIndex = i;
              console.log(`Character deleted at index: ${changedIndex}`);

              decreaseSnapshots(changedIndex);
              break;
            }
          }

      
          // If entire end was deleted
          if (changedIndex === -1) {
            changedIndex = newValue.length;
            console.log(`Character deleted at index: ${changedIndex}`);

            decreaseSnapshots(changedIndex);
          }
        }

        setStory(newValue);
        previousStory.current = newValue;
      };

     


    /*
    const handleAddSnapshot = () => {
        const linksArray = newLinks.split(",").map(link => link.trim());
        setSnapshots([...snapshots, { text: newSnapshotText, links: linksArray }]);
        setNewSnapshotText("");
        setNewLinks("");
    };
    */

    /*
    const handleDeleteSnapshot = (index) => {
        const updatedSnapshots = snapshots.filter((_, i) => i !== index);
        setSnapshots(updatedSnapshots);
    };
    */
    /*
    const handleDownload = () => {

        const fileContent = `
        Title: ${title}
        Category: ${storyType}
        Story : ${story}
        summary: ${summary}`;

        const element = document.createElement("a");
        const file = new Blob([fileContent], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = `{title || "Untitled_story"}.txt;`;
        document.body.appendChild(element);
        element.click();
    };
    */

    const handleDeleteLink = (index) => {
        setTargetSnap((prevTargetSnap) => prevTargetSnap.filter((_, i) => i !== index));
      };
    
      const handleChangeLink = (index, newString) => {
        setTargetSnap((prevTargetSnap) => {
          const updatedSnap = [...prevTargetSnap];
          updatedSnap[index] = newString;
          return updatedSnap;
        });
      };

      const handleSaveLink = (index) => {
        console.log("handleSaveLink: " + index);
      }

    const getSelectedTextRange = () => {
        if (storyBox.current) {
          const textarea = storyBox.current;
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const links = [];
      
          console.log(`Selected text starts at ${start} and ends at ${end}`);

          setSnapshots(prev => [...prev, { start, end, links }]);

          return { start, end };
        }
        return { start: null, end: null };
      };

    return (
        <><div>
            <h1>{storysent.storyId ? "Edit Your Story" : "Create Your Story"}</h1>
            <div>
                <label>Type of Story</label>
                <select value={storyType} onChange={(e) => setStoryType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                </select>
            </div>
            <div>
                <label>Title for Story</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            {!storysent.storyId && (
                <div>
                    <button
                        type="button"
                        onClick={() => document.getElementById('coverImageUpload').click()}>
                        Upload Cover Image
                    </button>
                    <input
                        type="file"
                        id="coverImageUpload"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    {coverImage && <p>Image Uploaded: {coverImage.name}</p>}
                </div>
            )}
            <div>
                <label>Summary</label>
                <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <div>
                <label>Enter Your Story</label>
                <textarea id="story" ref={storyBox} value={story} onChange={(e) => {
                    setStory(e.target.value);
                    handleStoryChange(e);
                }}  />
            </div>


            <div className="snapshots-section">
                <h3>Snapshots</h3>
                <div>
                    <button onClick={getSelectedTextRange}>Create Snapshot</button>

                    <table>
                        <thead>
                            <tr>
                            <th>Snap No.</th>
                            <th>Snapshot</th>
                            <th>Actions</th>
                            <th>Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {snapshots.map((snapshot, index) => {
                            const text = storyBox.current?.value || '';
                            const snap = text.substring(snapshot.start, snapshot.end);

                            const goToCursor = () => {
                                if (storyBox.current) {
                                  storyBox.current.focus();
                                  storyBox.current.setSelectionRange(snapshot.start, snapshot.start);
                                  storyBox.current.scrollTop = storyBox.current.scrollHeight * (snapshot.start / text.length);
                                }
                              };


                            const deleteSnapshot = () => {
                                setSnapshots(prev => {
                                  const updated = [...prev];
                                  updated.splice(index, 1);
                                  return updated;
                                });
                                {/*
                                setLinks(prev => {
                                  const updated = [...prev];
                                  updated.splice(index, 1);
                                  return updated;
                                });
                                */}
                            };

        

                            const addEmptyLink = (index, callback) => {
                                setSnapshots((prevSnapshots) => {
                                  const updatedSnapshots = [...prevSnapshots];
                                  
                                  // Ensure that links is always an array
                                  const links = Array.isArray(updatedSnapshots[index].links)
                                    ? updatedSnapshots[index].links
                                    : [];  // If it's not an array, initialize it as an empty array
                              
                                  updatedSnapshots[index] = {
                                    ...updatedSnapshots[index],
                                    links: [...links, ""],  // Add the empty string to the links array
                                  };
                              
                                  // Callback after the state is updated
                                  callback();
                              
                                  return updatedSnapshots;
                                });
                              };
                              
                              const handleAddNewLinkClick = (index) => {
                                console.log("Add new link clicked");
                              
                                
                                addEmptyLink(index, () => {
                                  
                                  setTargetSnap(snapshots[index].links);
                                });
                              };
                              

                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td><pre>{snap}</pre></td>
                                <td>
                                    <button onClick={goToCursor}>Go to</button>
                                    <button onClick={deleteSnapshot}>Delete Snapshot</button>
                                </td>
                                <td>
                                <button onClick={() => handleAddNewLinkClick(index)}>Add New Link</button>
                                </td>
                                
                                {/*
                                <td>
                                {links[index] && (
                                    <a href={links[index]} target="_blank" rel="noopener noreferrer">
                                    {links[index]}
                                    </a>
                                )}
                                </td>

                                */}
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
                </div>

                {/*
                <ul>
                    {snapshots.map((snapshot, index) => (
                        <li key = {index}>
                            <p><strong>{snapshot.text}</strong></p>
                            <ul>
                                {snapshot.links.map((link, linkIndex) => (
                                   <li key={linkIndex}>
                                        <a href={link} target="_blank" rel="noopener norefreere">{link}</a>
                                   </li> 
                                ))}
                            </ul>
                            <button onClick={() => handleDeleteSnapshot(index)}>Delete Snapshots</button>
                        </li>
                    ))}
                    </ul>
                    <div>
                        <input type="text" placeholder = "snapshot Text" value = {newSnapshotText} onChange={(e) => setNewSnapshotText(e.target.value)}></input>
                        <input type="text" placeholder = "Links (comma-seperated)" value={newLinks} onChange={(e) => setNewLinks(e.target.value)}/>
                        <button onClick={handleAddSnapshot}>Add Snapshot</button>
                    </div>
            </div>
            <div className="button-container">
            */}


                <div>
                    <h3>Strings in targetSnap</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Index</th>
                            <th>String</th>
                        </tr>
                        </thead>
                        <tbody>
                        {targetSnap.map((str, index) => (
                            <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                type="text"
                                value={str}
                                onChange={(e) => handleChangeLink(index, e.target.value)}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleSaveLink(index)}>Save</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteLink(index)}>Delete</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

            {/*
            <div className="add-link-selection">
                <h3>Add Link</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Heading1</th>
                                <th>Heading2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {targetSnap.map((targetSnap, index) => {
                            //const text = storyBox.current?.value || '';
                            //const targetSnap = text.substring(targetSnapshot.start, targetSnapshot.end);
                            
                              

                            return (
                                <tr key={index}>
                                <td>{index + 1}</td>
                                <td><pre>{targetSnap}</pre></td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
            </div>

            */}




            {storysent.storyId ? (
                    <>
                        {!isPublished ? (
                            <button className="save" onClick={() => handleSaveOrPublish(false)}>Update Unpublished Story</button>
                        ) : (
                            <button className="save" onClick={() => handleSaveOrPublish(true)}>Update Publish Story</button>
                        )}
                    </>
                ) : (
                    <>
                        <button className="save" onClick={() => handleSaveOrPublish(false)}>Save</button>
                        <button className="publish" onClick={() => handleSaveOrPublish(true)}>Publish</button>
                    </>
                )}
            </div>
        </div>
        </>
    );
}

export default WriteStory;