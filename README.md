**Old Code - Not Maintained! - Last Update: 22/05/2018**

# HQ-NodeJS
Remember when HQ was a thing? Yea.. thats when this was built and last tested.

# Install
* Download files.
* Install Dependencies (look at top of file for **require**ments)
* Install any iOS AirPlay software (i used 5KPlayer, but its can be flakey to connect).
  * (will most likely work on Android, but you will have to change all the *robot.getPixelColor*'s and *sharp.extract*'s)

# Usage
* Mirror your phone to your PC and open HQ then move the mirror window to the center of your screen.
* Do *node index-google.js*
* As a question appears on your screen, the console will start detecting and googling the answer.
* A tally will then be shown of how many times a result was shown on Google.

# Known Issues
 * Questions that ask you *'which one of these'* may not work properly as Google won't bring the correct results back.
