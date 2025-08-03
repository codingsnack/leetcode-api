# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
  - [Example Usage](#example-usage)
  - [Available methods](#available-methods)
  - [Docs](#docs)
  - [Todo](#todo)
    - [Features](#features)
    - [Technical/Other Improvements](#technicalother-improvements)

## Introduction

This is a [npm library](https://www.npmjs.com/package/@codingsnack/leetcode-api) through which one can interface with leetcode api.

## Getting Started

Install the api into your node project through npm or yarn.

- npm: `npm i @codingsnack/leetcode-api`
- yarn: `yarn add @codingsnack/leetcode-api`

## Example Usage

To use this api, you need to login to your [leetcode.com](https://leetcode.com/) account and then copy the two cookies mentioned below and pass it to Leetcode constructor. You can get these cookies using chrome devtools or [EditThisCookie](https://www.editthiscookie.com/) chrome extension.

- csrfToken
- LEETCODE_SESSION

```js
const { Leetcode } = require('@codingsnack/leetcode-api');

const main = async () => {
  // csrfToken after you've logged in
  const csrfToken = '';
  // LEETCODE_SESSION after you've logged in
  const session = '';

  const lc = new Leetcode({ csrfToken, session });

  const problem = await lc.getProblem('two-sum');
  console.log(problem);

};

main();

```

## Available methods

Currently availably methods are

- `getProblem(slug)`: Get information about single problem based on its title(also referred to as slug)
- `getMyLists()`: Get all the lists that you have created or have favorited.
- `getProblems(params)`: Get all the problems based on passed params. Supports pagination, filter by category, listId, difficulty, status, premiumOnly, tags, companies, searchKeyWords. You can also orderBy FRONTEND_ID, AC_RATE(acceptance rate), DIFFICULTY, FREQUENCY. Sort order can be ascending or descending. This is same as going to <https://leetcode.com/problems>.
- `getSubmission(slug)`: Get all submissions for given problem.
- `getRandomQuestion()`: Get a random question.
- `getPublicList(listId)`: Get a public list based on its listId.
- `getProblemsByTag(tag)`: Get problems by tag(like array). This is same as going to <https://leetcode.com/tag/array>.
- `getProblemsByCompany(company)`: Get problems by company(like apple). This is same as going to <https://leetcode.com/company/apple>.
- `getSimilarProblems(slug, depth = 1)`: Get similar problems based on slug. Depth param is optional and default value is 1. If depth is say `2` and slug is `two-sum`, then this will fetch similar questions to `two-sum` and then similar questions to all the similar questions of `two-sum`. Note that this will return a problem instance and this will have a field called similarProblems which is an array and the consumer can recurse through this. Also note that this method is still in beta.
- `addQuestionToFavorite(favoriteSlug, questionSlug)`: Add a question to a favorite list. Returns an object with `ok` (boolean) and `error` (string) properties.
- `batchAddQuestionsToFavorite(favoriteSlug, questionSlugs)`: Add multiple questions to a favorite list. Returns an object with `ok` (boolean) and `error` (string) properties.

## Docs

For docs refer this [link](https://codingsnack.github.io/leetcode-api/).

## Todo

### Features

- Post submission and get the result back
- Fetch any user profile(including contribution graph)
- Fetch loggedIn user's session details(as in progress mainted by leetcode).
- Fetch discuss sections for a problem
- Optimize similarProblems method
- Build adjaceny list of problems based on tag, company etc so its easier to visualize the connections between similar problems.

### Technical/Other Improvements

- Add better docs, wiki and examples.
- Add Contributing Page.
- Add github actions to check the build process and automatically generate docs and deploy them.
- Update master branch to main branch.
