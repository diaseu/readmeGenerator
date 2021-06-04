
const fs = require('fs')
const inquirer = require('inquirer')

// Initialize generator: Prompt and Then
inquirer
  .prompt([
    {
      name: "title",
      type: 'input',
      message: "Title of project?",
    },
    {
      name: "description",
      message: "Description of project?",
    },
    {
      name: "screenshot",
      message: "URL to screenshot of project?",
    },
    {
      name: "installation",
      message: "Installation instruction?",
    },
    {
      name: "usage",
      message: "Usage info?",
    },
    {
      name: "license",
      type: 'list',
      message: "Test instructions?",
      choices: ['MIT', 'Apache 2.0', 'GPLv3'],
    },
    {
      name: "contributing",
      message: "Contributing info?",
    },
    {
      name: "tests",
      message: "Test instructions?",
    },
  ])
  .then((answer) => {

    // Generate Head section
    async function head() {
      const markdownHead = `
<h1 align="center">${answer.title}</h1>
<div align="center">${answer.description}</div>
<img src="${answer.screenshot}" align="center" alt="Screenshot of Application">
`
      fs.appendFile('readme.md', markdownHead, err => {
        if (err) { console.log(err) }
        // console.log('README File Created!')
      })
    }
    head()

    // Generate License badge
    async function license() {
      const markdownMIT = `
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  `
      const markdownGPL = `
  [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
  `
      const markdownApache = `
  [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
  `
      if (answer.license === 'MIT') {
        fs.appendFile('readme.md', markdownMIT, err => {
          if (err) { console.log(err) }
        })
      } else if (answer.license === 'GPLv3') {
        fs.appendFile('readme.md', markdownGPL, err => {
          if (err) { console.log(err) }
        })
      } else {
        fs.appendFile('readme.md', markdownApache, err => {
          if (err) { console.log(err) }
        })
      }
    }
    license()

    // Generate Foot
    async function bodyFoot() {
      // Define markdownBody
      const markdownBody = `
  ---
  
  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ---
  
  ## Installation
  
  ${answer.installation}
  
  ## Usage
  
  ${answer.usage}
  `
      // Define markdownFoot
      const markdownFoot = `
  ## Contributing
  
  ${answer.contributing}
  
  ## Tests
  
  ${answer.tests}
  
  ## Questions
  
  ${answer.tests}
  `
      fs.appendFile('readme.md', markdownBody + markdownFoot, err => {
        if (err) { console.log(err) }
        console.log('README File Created!')
      })
    }
    bodyFoot()


  })
  .catch(err => console.error(err))
// }

// function call to initialize program
// readmeGenerator()