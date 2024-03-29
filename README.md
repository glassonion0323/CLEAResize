# CLEAResize
A Moiré-Free Image Resizing Script for Photoshop

[日本語](https://github.com/glassonion0323/CLEAResize/blob/master/README.ja.md)

## Examples

### Claude Mellan's "The Sudarium of Saint Veronica" (1649)
A portion of the original image.  
<img alt="The Sudarium of Saint Veronica (portion)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/mellanface-portion.jpg" />  

Downscaled to 20% of the original image.  
<img alt="The Sudarium of Saint Veronica (downscaled)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/mellanface400compare.jpg" />

### Concentric circles
Original 600x600  
<img alt="Original 600x600" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric.png" />  

Downscaled 200x200 (bicubic)  
<img alt="Downscaled 200x200 (bicubic)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric_200_bicubic.png" />  

Downscaled 200x200 (CLEAResize)  
<img alt="Downscaled 200x200 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/concentric_200_clearesize.png" />  

### Transition of checker and flat gray
Original 512x512  
<img alt="Original 512x512" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker.png" />  

Downscaled 290x290 (bicubic)  
<img alt="Downscaled 290x290 (bicubic)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_290_moire.png" />  

Downscaled 290x290 (CLEAResize)  
<img alt="Downscaled 290x290 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_290_clearesize.png" />  

Downscaled 145x145 (bicubic)  
<img alt="Downscaled 145x145 (bicubic)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_145_bicubic.png" />  

Downscaled 145x145 (CLEAResize)  
<img alt="Downscaled 145x145 (CLEAResize)" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/graychecker_145_clearesize.png" />  

## Requirements
Photoshop CS4 or later (Windows or Mac)

## Download
Go to [the latest release page](https://github.com/glassonion0323/CLEAResize/releases/latest) and download *CLEAResize.zip*.

## Installation
1. Exit Photoshop and copy CLEAResize.jsx in CLEAResize.zip to the following directory.  
*[Photoshop installation directory]/Presets/Scripts*  
For example, if your Photoshop is 64 bit CS5 for Windows, the directory is as follows.  
C:\\Program Files\\Adobe\\Adobe Photoshop CS5 (64 Bit)\\Presets\\Scripts  
If you get the message "Destination Folder Access Denied", click "Continue".  
2. Restart Photoshop and choose File \> Automate. You will find CLEAResize added to the menu.
<img alt="Photoshop menu" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/clearesizemenu.png" />  
(CLEAResize will be grayed out if no documents are opened.)

## How to Use
Open an image that you want to resize with Photoshop and select CLEAResize from Files \> Automate menu.  
<img alt="The main window" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/clearesizedialog.png" />  
The window above will appear.  
Input the width, height, or ratio that you want to resize to, and click OK.

### "Darker" option
As you can see in examples above, CLEAResize retains colors of original images better than usual bicubic resizing.  
This characteristic, however, can lead to a result that is whiter than your intention in some cases; for example, when resizing a halftone artwork, which each dots are reduced in size on purpose to cancel out the influence of ink spreading (dot gain) during the printing process.  
By checking "Darker (simulate dot gain)" option, CLEAResize performs a simple simulation of dot gain to get darker result that resembles to the printout.  
<img alt="Darker option" src="https://raw.githubusercontent.com/wiki/glassonion0323/CLEAResize/images/dvorak_comparison.png" />

## Limitations
* CLEAResize can not remove moiré that already exists before resizing.  
* Though CLEAResize is suitable for making monitor displaying images from halftone images, it is not fit to make halftone images for printing by resizing the original halftone images.  
* CLEAResize can not avoid moiré that occurs in Smart Objects. If you get moiré in Smart Objects, rasterize them before executing CLEAResize.

## Change Log
* Ver. 1.0.5 (Jul. 28, 2023)  
Fixed an error that occured on Photoshop version 24.7.0 when the only layer is the background and the checkbox "Scale layer styles" is checked.
* Ver. 1.0.4 (Feb. 01, 2020)  
Fixed an issue that prevented the execution of blurring when the option "Scale layer styles" is not selected.
* Ver. 1.0.3 (Mar. 19, 2016)  
Added blurring before resizing to a smaller size than 1/4 of the original.  
This blurring is so weak that downscaled images will seem to be nothing differrent in most cases, but it prevents moire on some images effectively.
* Ver. 1.0.2 (Sep. 07, 2015)  
Fixed TEXT_VERSION
* Ver. 1.0.1 (Sep. 07, 2015)  
Licensed under CC0
* Ver. 1.0.0 (Sep. 06, 2015)  
Initial release

## License
CLEAResize.jsx is licensed under the Creative Commons CC0 1.0 Universal Public Domain Dedication.

To the extent possible under law, the person who associated CC0 with CLEAResize has waived all copyright and related or neighboring rights to CLEAResize.  
You should have received a copy of the CC0 Public Domain Dedication along with this software. If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

## References
CLEAResize was written referencing the following webpages:
* [Gamma error in picture scaling](http://www.ericbrasseur.org/gamma.html) by Eric Brasseur
* [Photoshop で【本当に】美しくリサイズする「ガンマ: 1.0 縮小法」 | 亜細亜ノ蛾](https://asiamoth.com/201102192357/) by asiamoth (Japanese language)
