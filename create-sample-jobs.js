// Script to create sample career jobs in the database
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://PatnarealEstate:mohitraj6205@cluster0.em7qp.mongodb.net/webory",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Career Schema
const careerSchema = new mongoose.Schema(
  {
    title: String,
    department: String,
    location: String,
    type: String,
    description: String,
    requirements: String,
    responsibilities: String,
    salary: String,
    status: {
      type: String,
      enum: ["open", "closed", "draft"],
      default: "open",
    },
    applications: [],
    createdBy: mongoose.Schema.Types.ObjectId,
    updatedBy: mongoose.Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Career = mongoose.model("Career", careerSchema);

// Sample jobs data
const sampleJobs = [
  {
    _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439011"),
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "We are looking for an experienced Frontend Developer to join our team and help build amazing web applications.",
    requirements:
      "5+ years of experience with React, Strong knowledge of JavaScript/TypeScript, Experience with modern frontend tools and frameworks, Excellent problem-solving skills",
    responsibilities:
      "Build and maintain web applications, Collaborate with design and backend teams, Optimize applications for maximum speed and scalability",
    salary: "Competitive",
    status: "open",
    createdBy: new mongoose.Types.ObjectId("507f1f77bcf86cd799439001"), // dummy admin ID
    applications: [],
  },
  {
    _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description:
      "Join our design team to create beautiful and intuitive user interfaces for our products.",
    requirements:
      "3+ years of UI/UX design experience, Proficiency in Figma and Adobe Creative Suite, Strong portfolio showcasing web and mobile designs, Experience with user research and testing",
    responsibilities:
      "Create user-centered designs, Conduct user research and usability testing, Collaborate with development teams",
    salary: "Competitive",
    status: "open",
    createdBy: new mongoose.Types.ObjectId("507f1f77bcf86cd799439001"),
    applications: [],
  },
  {
    _id: new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description:
      "Help us grow our digital presence and reach new customers through innovative marketing strategies.",
    requirements:
      "3+ years of digital marketing experience, Experience with SEO and SEM, Strong analytical skills, Knowledge of marketing automation tools",
    responsibilities:
      "Develop and execute digital marketing campaigns, Analyze campaign performance, Optimize marketing strategies",
    salary: "Competitive",
    status: "open",
    createdBy: new mongoose.Types.ObjectId("507f1f77bcf86cd799439001"),
    applications: [],
  },
];

async function createSampleJobs() {
  try {
    console.log("Creating sample jobs...");

    for (const job of sampleJobs) {
      const existingJob = await Career.findById(job._id);
      if (!existingJob) {
        await Career.create(job);
        console.log(`Created job: ${job.title}`);
      } else {
        console.log(`Job already exists: ${job.title}`);
      }
    }

    console.log("Sample jobs created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error creating sample jobs:", error);
    process.exit(1);
  }
}

createSampleJobs();
