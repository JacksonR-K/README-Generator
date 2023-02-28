const inquirer = require('inquirer');
const fs = require('fs');

const questions = [
    {
        type: 'input',
        message: 'Project Name:',
        name: 'projectName'
    },
    {
        type: 'input',
        message: 'Description:',
        name: 'description'
    },
    {
        type: 'input',
        message: 'Installation instructions (if applicable):',
        name: 'installation',
        default: 'N/A',
    },
    {
        type: 'input',
        message: 'Usage instructions:',
        name: 'usage',
    },
    {
        type: 'list',
        message: 'License used:',
        name: 'license',
        choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License'],
    },
    {
        type: 'input',
        message: 'Contributing guidelines:',
        name: 'contributing',
        default: 'N/A',
    },
    {
        type: 'input',
        message: 'Tests:',
        name: 'tests',
        default: 'N/A',
    },
    {
        type: 'input',
        message: 'GitHub Profile Name:',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Email address:',
        name: 'email',
    }];

function getBadge(license) {
    switch (license) {
        case 'Apache License 2.0':
            return `[![License: Apache v2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
            break;
        case 'GNU General Public License v3.0':
            return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://opensource.org/license/gpl-3.0)`;
            break;
        case 'MIT License':
            return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
            break;
    }
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName,
`# ${data.projectName}

${getBadge(data.license)}

## Description

${data.description}

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)

## Installation

${data.installation}

## Usage

${data.usage}

## License
`
/*Gets the URL portion of the license from the badge info*/
+ `
[${data.license}](${getBadge(data.license).split('(')[2].replace(')', '')})

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

Any questions regarding the application can be directed via GitHub or Email:
- [GitHub Profile](https://www.github.com/${data.github})
- ${data.email}`,
        (err) => {
            err ? console.log(err) : console.log('README Framework Created!');
        })
}

function init() {
    inquirer
        .prompt(questions)
        .then((response) => {
            writeToFile('README.md', response);
        })
}

// Function call to initialize app
init();
