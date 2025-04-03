import React, { use, useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context.js";
import '../CSS Folder/WriteStory.css';


function WriteStory() {
    const { userId } = useContext(UserContext); // Fetch userId from context
    const [storyType, setStoryType] = useState("");
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [story, setStory] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const {storyId} = useParams(); // Added for story ID
    const [snapshots, setSnapshots] = useState([]);
    const [newSnapshotText, setNewSnapshotText] = useState("");
    const [newLinks, setNewLinks] = useState("");
    console.log(storyId);
    useEffect(() => {
        if (storyId) {
            const fetchStory = async () => {
                try {
                    const response = await axios.get(`/api/get-story/${storyId}`);
                    console.log("Starting the edit part:", response);
                    const { storyType, title, summary, story, coverImage } = response.data; // Include coverImage
                    setStoryType(storyType);
                    setTitle(title);
                    setSummary(summary);
                    setStory(story);
                    setCoverImage(coverImage); // Set the coverImage state
                    setSnapshots(snapshots || []); // Set snapshots state
                } catch (error) {
                    console.error("Error fetching story:", error);
                }
            };
            fetchStory();
        } else {
            // No storyId; assume the user is creating a new story
            setStoryType("");
            setTitle("");
            setSummary("");
            setStory("");
            setCoverImage(null); // Reset the coverImage state
            setSnapshots([]); // Reset snapshots state
        }   
    }, [storyId]);


    const handleImageUpload = (event) =>{
        setCoverImage(event.target.files[0]);
    };

  

    const handleSaveOrPublish = async(isPublished) => {
        try{

            if (!storyType || !title || !summary || !story) {
                alert("Please fill out all required fields: Story Type, Title, Summary, and Story.");
                return; // Exit the function if validation fails
            } 
            
            const formData = new FormData();
            formData.append("storyType", storyType);
            formData.append("title", title);
            formData.append("summary",summary);
            formData.append("story", story);
            formData.append("coverImage",coverImage);
            formData.append("isPublished", isPublished);
            formData.append("userId", userId);
            formData.append("snapshots", JSON.stringify(snapshots)); // Include snapshots

            if(storyId){
                console.log(storyId);
                await axios.put('/api/update-story/${storyId}',formData);
                alert(isPublished ? "Story published successfully!" : "Story updated successfully!");            
            } else{
                console.log(formData);
                const response = await axios.post("http://localhost:5000/api/save-story",formData);
                alert(isPublished ? "Story published successfully!" : "Story updated successfully!");            }
                window.location.reload(); 
            }
        catch (error){
            console.error("Error saving story:", error);
        }
    };

    const handleAddSnapshot = () => {
        const linksArray = newLinks.split(",").map(link => link.trim());
        setSnapshots([...snapshots, { text: newSnapshotText, links: linksArray }]);
        setNewSnapshotText("");
        setNewLinks("");
    };

    const handleDeleteSnapshot = (index) => {
        const updatedSnapshots = snapshots.filter((_, i) => i !== index);
        setSnapshots(updatedSnapshots);
    };

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

    return (
        <><div>
            <h1>{storyId ? "Edit Your Story" : "Create Your Story"}</h1>
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
                    onChange={handleImageUpload} />
                {coverImage && <p>Image Uploaded: {coverImage.name}</p>}
            </div>
            <div>
                <label>Summary</label>
                <textarea id="summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <div>
                <label>Enter Your Story</label>
                <textarea id="story" value={story} onChange={(e) => setStory(e.target.value)} />
            </div>
            <div className="snapshots-section">
                <h3>Snapshots</h3>
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
                <button className="save" onClick={() => handleSaveOrPublish(0)}>{storyId ? "Update" : "save"}</button>
                <button className="publish" onClick={() => handleSaveOrPublish(1)}>Publish</button>
            </div>
            {/* {grammarCheckResult && <div>Grammar Check Result: {grammarChcekResult}</div>} */}
        </div>
        </>
    );
}

export default WriteStory;