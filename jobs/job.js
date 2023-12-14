const fs = require('fs');
const { jobs, technologies } = require("./data.js");

const jobsWithTags = jobs.map((job) => {
    const tags = new Set(
        job.description.split(/[,\s./\\]+/)
            .map(word => technologies.find(tech => word.toLowerCase()==tech.toLowerCase() ))
            .filter(Boolean)
    );

    return { job, tags: [...tags] };
});

const timestamp = new Date().getTime();  
const filename = `${timestamp}_jobsWithTags.json`;

const jobsWithTagsJSON = JSON.stringify(jobsWithTags);

fs.writeFile(filename, jobsWithTagsJSON, 'utf8', (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log(`Data saved in ${filename}`);
    }
});
console.log(undefinedVariabjle);
