==============================================================================
            CLEAResize
            A Moiré-free Image Resizing Script for Photoshop
            https://github.com/glassonion0323/CLEAResize
==============================================================================

----------------------------------------
    Requirements
----------------------------------------
    Photoshop CS4 or later (Windows or Mac)

----------------------------------------
    Download
----------------------------------------
    Go to the following latest release page and download "CLEAResize.zip".
    https://github.com/glassonion0323/CLEAResize/releases/latest

----------------------------------------
    Installation
----------------------------------------
1.  Exit Photoshop and copy CLEAResize.jsx in CLEAResize.zip to the following
    directory.
    [Photoshop installation directory]/Presets/Scripts
    For example, if your Photoshop is 64 bit CS5 for Windows, the directory
    is as follows.
    C:\Program Files\Adobe\Adobe Photoshop CS5 (64 Bit)\Presets\Scripts
    If you get the message "Destination Folder Access Denied", click
    "Continue".
2.  Restart photoshop and choose File \> Automate. You will find CLEAResize
    added to the menu.
    (CLEAResize will be grayed out if no documents are opened.)

----------------------------------------
    How to Use
----------------------------------------
    Open a image that you want to resize with Photoshop and select CLEAResize
    from Files > Automate menu.
    CLEAResize's main window will appear.
    Input the width, height, or ratio you want to resize to, and click OK.

  * "Darker" option
    CLEAResize retains colors of original images better than usual bicubic
    resizing.
    This characteristic, however, can lead to a unexpectedly whiter result in
    some cases; for example, when resizing a halftone artwork, which each dots
    are reduced in size on purpose to cancel out the influence of ink
    spreading (dot gain) during the printing process.
    By checking "Darker (simulate dot gain)" option, CLEAResize performs a
    simple simulation of dot gain to get darker result that resembles to the
    printout.

----------------------------------------
    Limitations
----------------------------------------
  * CLEAResize can not remove moiré that already exists before resizing.
  * Though CLEAResize is suitable for making monitor displaying images from
    printing data, it is not fit to make printing halftone data resizing
    another halftone data.
  * CLEAResize can not avoid moiré that occurs in Smart Objects. If you get
    moiré in Smart Objects, rasterize them before executing CLEAResize.

----------------------------------------
    Change Log
----------------------------------------
  * Ver. 1.0.3 (Mar. 19, 2016)  
    Added blurring before resizing to a smaller size than 1/4 of the original.
    This blurring is so weak that downscaled images will seem to be nothing
    differrent in most cases, but it prevents moire on some images effectively.
  * Ver. 1.0.2 (Sep. 07, 2015)
    Fixed TEXT_VERSION
  * Ver. 1.0.1 (Sep. 07, 2015)
    Licensed under CC0
  * Ver. 1.0.0 (Sep. 06, 2015)
    Initial release

----------------------------------------
    License
----------------------------------------
    CLEAResize.jsx is licensed under the Creative Commons CC0 1.0 Universal
    Public Domain Dedication.

    To the extent possible under law, the person who associated CC0 with
    CLEAResize has waived all copyright and related or neighboring rights to
    CLEAResize.
    You should have received a copy of the CC0 Public Domain Dedication along
    with this software. If not, see
    <http://creativecommons.org/publicdomain/zero/1.0/>.

----------------------------------------
    References
----------------------------------------
    CLEAResize was written referencing the following webpages:

    "Gamma error in picture scaling" by Eric Brasseur
        http://www.4p8.com/eric.brasseur/gamma.html

    "Photoshop で【本当に】美しくリサイズする「ガンマ: 1.0 縮小法」 |
    亜細亜ノ蛾" by asiamoth (Japanese language)
        http://asiamoth.com/mt/archives/2011-02/19_2357.php

