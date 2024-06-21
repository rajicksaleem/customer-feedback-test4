const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to handle form submission
app.post('/submit-feedback', (req, res) => {
    const feedback = req.body;

    // Save the feedback data to a file
    fs.readFile('feedback.json', (err, data) => {
        let feedbacks = [];
        if (!err) {
            feedbacks = JSON.parse(data);
        }
        feedbacks.push(feedback);
        fs.writeFile('feedback.json', JSON.stringify(feedbacks, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Server error');
            }
            res.status(200).send('Feedback received');
        });
    });
});

// Endpoint to export feedback data
app.get('/export-feedback', (req, res) => {
    fs.readFile('feedback.json', (err, data) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.setHeader('Content-disposition', 'attachment; filename=feedback.json');
        res.setHeader('Content-type', 'application/json');
        res.write(data, () => res.end());
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
