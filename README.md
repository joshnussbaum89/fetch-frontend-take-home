# Fetch Take-Home Exercise

## Overview

This is a simple web application built with Next JS that allows users to search for a dogs and find a match.

## Local Development

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Live Site

[Link](https://fetch-frontend-take-home.vercel.app/)

## Features

- User authentication
- Users can filter dogs by breed or sort all dogs by breed alphabetically
- Results are paginated
- All fields of the Dog object (except for id) are presented in some form
- Users can select as many dogs as they like to discover a match

## Notes

I had some issues fetching data from API on Safari desktop. However, all other browsers (mobile + desktop) should be working fine. If Safari is not working, you may need to uncheck the "Prevent cross-site tracking" option in Safari's Privacy settings. You can access this by going to Safari > Preferences > Privacy > uncheck "Prevent cross-site tracking".

[Issue with Safari and credentials:include](https://stackoverflow.com/questions/54509950/credentials-include-not-including-cookie-header)

## Features that would be nice in this app

- A "Reset" button that removes a users favorite dogs
- Some more fun styling (fonts, landing page, instructions, filters, etc.)
- Improve copy + user flow
- Testing
