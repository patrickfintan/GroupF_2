const express= require("express");
require('dotenv').config({path : './frontend/src/process.env'});
const path = require("path"); // Add this line to import path
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer"); //For handlind file uploads
const cors = require("cors");
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const bcrypt = require("bcrypt"); // Import bcrypt for hashing

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // If parsing URL-encoded data
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images


let globalMoviesCache = []; // This will hold the movies data 

mongoose
.connect("mongodb://localhost:27017/registration",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    username: { type : String, required : true, unique:true },
    email: {type : String, required : true, unique: true},
    password: {type : String, required: true},
    resetToken: {type:String},
    tokenExpiry:{type:Date},
});

const User = mongoose.model("User", userSchema);

 
// Saving the details while registering
app.post("/register", async (req, res) =>{
    try{
        const {username, email, password } = req.body;

        if (!username || !password || !email){
            return res.status(400).json({error: "Username, email and password are required"}); 
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({username, email,password: hashedPassword});
        const savedUser = await newUser.save();
        res.status(201).json({userId: savedUser._id});
    }catch(error){
        console.error("Error saving user:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

//Verifying the details while signing in
app.post("/SignIn", async (req, res) => {
    const { username,  email, password} = req.body;
    console.log(username, password)
    try{
        const user = await User.findOne({$or:[
            {username: username},
            {email: email}]
        });

        if (!user){
            return res.status(401).json({message: "Invalid username or password"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch){
            return res.status(401).json({ message: "Invalid username or password"});
        }

        res.json({userId: user._id})
    }catch(error){
        console.error("SignIn Error:", error);
        res.status(500).json({message: "An error occurred during sign-in"});
    }
});

//Forgot Pass word section
app.post("/forgot-password", async (req, res)=>{
    const {email} = req.body;
    console.log(email);

    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({error:"User not found"});
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.tokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = 'http://localhost:300/reset-password?token=$resetToken}';
    sendEmail(user.email, "Password Reset", `Click here to reset your password: ${resetLink}`);
    res.status(200).json({ message: "Password reset email sent" });
});

async function sendEmail(to, subject, text){
    try{
        console.log("Email:", process.env.EMAIL_USER);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            debug: true, // Enable debugging
            logger: true,
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        } catch (error) {
    console.error('Error sending email:', error);
  }
    
};

//Reset password section
app.post("/reset-password", async(req, res) =>{
    const {token, password} = req.body;

    try{
        const user = await User.findOne({ resetToken: token, tokenExpiry : {$gt: Date.now()}});
        
        if(!user){
            return res.status(400).json({error: "Invalid or expired token" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    }catch(err){
        console.error(err);
        res.status(500).json({error: "An error occurred. Please try again."});
    }
}
);


//Fetching top stories for Home page
const storySchema = new mongoose.Schema({
    title: String,
    category: String,
    summary: String,
    image: String,
    rating:Number,
});

const StoryDetails = mongoose.model("StoryDetails",storySchema);

//Fetching and filter top 3 in each categories
app.get("/api/movies",async(req,res) =>{
    try{
        if(globalMoviesCache.length === 0 ){
            console.log("Fetching Movie Details from Data Base");
            const movies = await StoryDetails.find();
            globalMoviesCache = movies;
        } else{
            console.log("Using cached movies data...");
        }

        const categories = {};

        globalMoviesCache.forEach((movie) => {
            if(!categories[movie.category]) {
                categories[movie.category] = [];
            }

            categories[movie.category].push(movie);
        });

        const topMovies = Object.entries(categories).map(([category, movies]) => ({
            category,
            movies: movies.sort((a,b) => b.rating - a.rating).slice(0,3),
        }));

        res.status(200).json(topMovies);
    } catch(error){
        res.status(500).json({error: "Failed to fetch movies"});
    }
});

//Saving the story
const storyDetails = new mongoose.Schema({
    storyId: { type: String, required: true, unique: true }, // Shared ID
    userId: String,
    storyType: String,
    title: String,
    summary: String,
    story: String,
    coverImage: String,
    isPublished: Boolean,
    snapshots: [
        {
            text: String,
            links: [String],
        }
    ],
    rating: { type: Number, default: 0 } ,
    });

const storyContent = new mongoose.Schema({
    storyId: { type: String, required: true, unique: true }, // Shared ID
    story: String, // Actual story content
  });

const storyEditsSchema = new mongoose.Schema({
    storyId: { type: String, required: true }, // Shared storyId
    userId: String, // User who made the edit
    editedStory: String, // Edited version of the story
    editedAt: { type: Date, default: Date.now }, // Timestamp of the edit
});

const Details = mongoose.model("storyDetails",storyDetails);
const Content = mongoose.model("storyContent", storyContent);
const StoryEdits = mongoose.model("StoryEdits", storyEditsSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "uploads/");
    },
    filename: function (req, file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage }); // Initialize Multer

app.post("/api/save-story", upload.single("coverImage"), async(req,res) => {
   try{
    console.log("Start of save");
    const {storyType, title, summary, story, userId, isPublished, snapshots} = req.body;
    const storyId = new mongoose.Types.ObjectId();
    const coverImage = req.file ? `uploads/${req.file.filename}` : null;

    const newStoryDetails = new Details({
        storyId,
        userId,
        storyType,
        title,
        summary,
        coverImage,
        isPublished,
        snapshots: JSON.parse(snapshots),
    });

    await newStoryDetails.save();

    const newStoryContent = new Content({
        storyId,
        story,
    });

    await newStoryContent.save();

    globalMoviesCache.push({
        storyId,
        userId : newStoryDetails.userId,
        storyType,
        title,
        summary,
        coverImage,
        isPublished
      });
    
    res.status(201).json({ message: "Story saved successfully!",storyId });
   } catch(error){
    console.error("Error saving story:", error);
    res.status(500).json({ error: "Error saving story" });
   }
});


//Fetching the story using story details
app.get("/api/story/:storyId", async (req, res) => {
    try{
        console.log("Fetching the story using story details");
        const {storyId} = req.params;
        const storyContent = await Content.findOne({ storyId });

        if(!storyContent){
            return res.status(404).json({message: "story not found"});
        }
        
        res.status(200).json(storyContent);
    }catch (error) {
            console.error("Error fetching story:", error);
            res.status(500).json({error: "Failed to fetch story"});
    }
});


//View Log
const storyViewLogSchema = new mongoose.Schema({
    userIdViewed: {type: String, required: true},
    storyId: {type: String, required:true},
    viewedAt: {type:Date, required:true}
});

const StoryViewLog = mongoose.model("StoryViewLog",storyViewLogSchema);

app.post("/api/story-view-log", async (req, res) =>{
    try{
        console.log("Saved the view history");
        const { userIdViewed, storyId, viewedAt} = req.body;

        const newLog = new StoryViewLog({
            userIdViewed,
            storyId,
            viewedAt
        });

        await newLog.save();

        res.status(201).json({message: "Story view logged successfully!"});
    

    }catch(error){
        console.error("Error logging story view",error);
        res.status(500).json({ error:"Failed to log story view"});
    }
});


//Saving the rating for the story
const ratingSchema = new mongoose.Schema({
    storyId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    review: { type: String, required: true },
    rating: { type: Number, required: true },
  });
  
  const Rating = mongoose.model("Rating", ratingSchema);


app.post("/api/save-rating", async (req, res) => {
    try{
        console.log("saving the rating");
        const {storyId, userId, name, email, review, rating} = req.body;
        console.log("Request body:", req.body); // Debug the request body
        const newRating = new Rating({
            storyId,
            userId,
            name,
            email,
            review,
            rating,
        });

        await newRating.save();

        res.status(201).json({message: "Rating saved successfully!"});
    }catch(error){
        console.error("Error saving rating:", error);
        res.status(500).json({ error: "Failed to save rating" });
    }
});

app.post("/api/update-story-rating", async (req,res) => {
    try{
        console.log("Updating the rating for both");
        const { storyId } = req.body;

        const ratings = await Rating.find({storyId});

        if(ratings.length ===0){
            return res.status(404).json({message: "No rating found for this story."});
        }

        const totalRatings = ratings.reduce((sum,rating)=> sum + rating.rating,0);
        const rating = Math.round(totalRatings/ ratings.length);

        await Details.updateOne({storyId},{$set: {rating}});
        globalMoviesCache = globalMoviesCache.map((movie) =>
            movie.storyId === storyId ? { ...movie, rating: rating } : movie
          );
      
          res.status(200).json({ message: "Average rating updated successfully!", rating });
    } catch (error) {
        console.error("Error updating average rating:", error);
        res.status(500).json({ error: "Failed to update average rating" });
    }
});


app.get('/stories', (req,res) =>{
    publishedStories =globalMoviesCache.filter((story) => story.isPublished === true);
    console.log("Starting the print");
    console.log(publishedStories);
    res.json(publishedStories);
});

app.get("/api/get-story/:storyId", (req, res) => {
    const { storyId } = req.params; // Extract storyId from the URL
    const story = globalMoviesCache.find((s) => s.storyId === storyId); // Find the story with matching storyId

    console.log(story);
    if (!story) {
        return res.status(404).json({ error: "Story not found" }); // Return 404 if story doesn't exist
    }

    res.json(story); // Send the story as JSON response
});

app.listen(PORT,() => {
    console.log('Server running on http://localhost:${PORT}');
});

