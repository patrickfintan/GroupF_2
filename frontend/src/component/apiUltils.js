import axios from "axios";

export const updateStoryDetails = async (fromComponent, editedStoryId, setEditedStoryId, setFromComponent) => {
    console.log("Before if", fromComponent, "and: ", editedStoryId);
    if (fromComponent === "WriteStory" && editedStoryId !== "") {
        try {
            console.log("Inside updateStoryDetails");
            await axios.post(`http://localhost:5000/api/unlock-story/${editedStoryId}`, {
                headers: { 'Content-Type': 'application/json' },
            });
            setEditedStoryId("");
            setFromComponent("");
            console.log("Story details updated successfully!");
        } catch (error) {
            console.error("Error updating story details:", error);
        }
    }
};