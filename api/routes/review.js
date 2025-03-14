const router = require("express").Router();
const Review = require("../models/Reviews");

//Create a review
router.post("/", async (req, res) => {
  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Edit reviews
router.put("/:userId", async (req, res) => {
  try {
    const { content, score } = req.body;
    console.log("Received Update Request for User:", req.params.userId);
    console.log("Received Review Data:", { content, score });

    // Find the user's review
    let review = await Review.findOne({ userId: req.params.userId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    console.log("Existing Review:", JSON.stringify(review, null, 2));

    // If score is not 0, update it
    if (score !== 0) {
      review.score = score;
    }

    if (content) {
      review.content = content;
    }

    const updatedReview = await review.save();
    console.log("Updated Review:", JSON.stringify(updatedReview, null, 2));
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Aggregate reviews to get average stars
router.get("/average", async (req, res) => {
  const productId = req.query.pid;

  try {
    const avgScore = await Review.aggregate([
      {
        $match: { productId },
      },
      {
        $group: { _id: "$productId", average: { $avg: "$score" } },
      },
    ]);

    if (avgScore.length > 0) {
      res.json({ productId, averageScore: avgScore[0].average });
    } else {
      res.json({ productId, averageScore: 0 }); // If no reviews exist, return 0
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
