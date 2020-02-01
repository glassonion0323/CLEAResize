/*
<javascriptresource>
<name>CLEAResize</name>
<menu>automate</menu>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

////////////////////////////////////////////////////////////
// CLEAResize 1.0.4
//   A Moiré-free Image Resizing Script for Photoshop
//
// History
//   Ver. 1.0.4                                Feb. 01, 2020
//      * Fixed an issue that prevented the execution of
//        blurring when the option "Scale layer styles" is
//        not selected.
//   Ver. 1.0.3                                Mar. 19, 2016
//      * Added blurring before downscaling.
//        This blurring is so weak that downscaled images
//        will seem to be nothing differrent in most cases,
//        but it prevents moire effectively.
//   Ver. 1.0.2                                Sep. 07, 2015
//      * Fixed TEXT_VERSION
//   Ver. 1.0.1                                Sep. 07, 2015
//      * Licensed under CC0
//   Ver. 1.0.0                                Sep. 06, 2015
//      * Initial release
//
// License
//   CLEAResize.jsx is licensed under the Creative Commons
//   CC0 1.0 Universal Public Domain Dedication.
//
//   CLEAResize.jsx by glassonion0323
//   To the extent possible under law, the person who
//   associated CC0 with CLEAResize.jsx has waived all
//   copyright and related or neighboring rights to
//   CLEAResize.jsx.
//   You should have received a copy of the CC0 Public
//   Domain Dedication along with this software. If not, see
//   <http://creativecommons.org/publicdomain/zero/1.0/>.
////////////////////////////////////////////////////////////

#target photoshop

$.localize = true;

////////////////////////////////////////////////////////////
// Constants
////////////////////////////////////////////////////////////

// Script name and the version
const   TEXT_SCRIPT_NAME            = "CLEAResize";
const   TEXT_VERSION                = "1.0.4";
const   TEXT_NAME_AND_VERSION       = TEXT_SCRIPT_NAME + " " + TEXT_VERSION;

// Captions
const   TEXT_WIDTH_CAPTION          = {
    en: "Width",
    ja: "幅",
    zh_CN: "宽度",
    zh_TW: "寬度",
    kr: "폭",
    de: "Breite",
    fr: "Largeur",
    es: "Anchura",
    pt: "Largura",
    it: "Larghezza"
};
const   TEXT_HEIGHT_CAPTION         = {
    en: "Height",
    ja: "高さ",
    zh_CN: "高度",
    zh_TW: "高度",
    kr: "높이",
    de: "Höhe",
    fr: "Hauteur",
    es: "Altura",
    pt: "Altura",
    it: "Altezza"
};
const   TEXT_SCALE_STYLES_CAPTION  = {
    en: "Scale layer styles",
    ja: "レイヤースタイルの拡大・縮小",
    zh_CN: "缩放图层样式",
    zh_TW: "縮放圖層樣式",
    kr: "레이어 스타일 비율 조정",
    de: "Ebenenstile skalieren",
    fr: "Mettre les styles à l'échelle",
    es: "Cambiar escala de estilos",
    pt: "Redimensionar Estilos",
    it: "Scala stili livello"
};
const   TEXT_SIMULATE_DOT_GAIN_CAPTION = {
    en: "Darker (simulate dot gain)",
    ja: "暗く (ドットゲインのシミュレート)",
    zh_CN: "较暗 (模拟网点增大)",
    zh_TW: "變暗 (模擬網點擴張)",
    kr: "더 어둡게 (도트 게인 시뮬레이션)",
    de: "Dunkler (Tonwertzuwachs simulieren)",
    fr: "Plus foncé (simuler l'engraissement)",
    es: "Más oscuro (simular ganancia de punto)",
    pt: "Mais Escuro (simular aumento de ponto)",
    it: "Più scuro (simula ingrossamento punti)"
};
const   TEXT_OK_CAPTION             = {
    en: "OK",
    ja: "OK",
    zh_CN: "确定",
    zh_TW: "確定",
    kr: "확인",
    de: "OK",
    fr: "OK",
    es: "OK",
    pt: "OK",
    it: "OK"
};
const   TEXT_CANCEL_CAPTION         = {
    en: "Cancel",
    ja: "キャンセル",
    zh_CN: "取消",
    zh_TW: "取消",
    kr: "취소",
    de: "Abbrechen",
    fr: "Annuler",
    es: "Cancelar",
    pt: "Cancelar",
    it: "Annulla"
};

// Alert messages
const   TEXT_NO_DOC_ALERT           = {
    en: "No documents are opened.",
    ja: "ドキュメントが開かれていません。"
};
const   TEXT_DOC_MODE_ALERT         = {
    en: "Convert to RGB Color mode or Grayscale mode to run %1.",
    ja: "%1を実行するには、RGBカラーモードまたはグレースケールモードに変換してください。"
};
const   TEXT_BIT_DEPTH_ALERT        = {
    en: "Convert to 8 bits/channel or 16 bits/channel to run %1.",
    ja: "%1を実行するには、8 bit/チャンネルまたは16 bit/チャンネルに変換してください。"
};
const   TEXT_GRAY_PROFILE_ALERT     = {
    en: "\"%1\" is an unknown color profile. Converting to working Gray.",
    ja: "\"%1\" は未知のカラープロファイルです。作業用グレープロファイルに変換します。"
};
const   TEXT_RGB_PROFILE_ALERT      = {
    en: "\"%1\" is an unknown color profile. Converting to working RGB.",
    ja: "\"%1\" は未知のカラープロファイルです。作業用RGBプロファイルに変換します。"
};
const   TEXT_UNDO_ALERT             = {
    en: "Undo the change selecting \"Step Backward\" from Edit menu.",
    ja: "編集メニューから「1段階戻る」を選択して変更を取り消してください。"
};

// Size limitations
const   VALUE_MIN_SIZE      = 1;
const   VALUE_MAX_SIZE      = 300000;

////////////////////////////////////////////////////////////
// Global Variables
////////////////////////////////////////////////////////////
var doc;                                                    // The active document
var layerArray              = new Array;                    // An array to memorize status of layers
var layerSetArray           = new Array;                    // An array to memorize status of layer sets
var dialogReturn            = false;                        // The main dialog's return value (perform resizing if this value is true)
var resizeStyles            = true;                         // Perform resizing of layer styles if this value is true
var simulateDotGain         = false;                        // Perform blurring as a simple dot gain simulation if this value is true
var orgHeight,  orgWidth;                                   // The original image size (pixel)
var newHeight,  newWidth;                                   // New image size after resizing (pixel)
var orgMode;                                                // The original color mode
var orgActiveLayer;                                         // The original active layer
var orgBits;                                                // The original bit depth

////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////

// A class to memorize objects' status
function classObjectStatus(obj, visible, allLocked) {
    this.obj        = obj;
    this.visible    = visible;
    this.allLocked  = allLocked;
}

// The main function
function main() {
    // Check if any documents are opened
    if (app.documents.length == 0) {
        alert(TEXT_NO_DOC_ALERT, TEXT_NAME_AND_VERSION);
        return;
    }

    doc                 = app.activeDocument;
    orgMode             = doc.mode;
    orgActiveLayer      = doc.activeLayer;

    // Check color mode
    if (orgMode != DocumentMode.RGB &&
        orgMode != DocumentMode.GRAYSCALE) {
        alert(localize(TEXT_DOC_MODE_ALERT, TEXT_SCRIPT_NAME), TEXT_NAME_AND_VERSION);
        return;
    }

    // Check bit depth per channel
    orgBits = doc.bitsPerChannel;
    if (orgBits == BitsPerChannelType.THIRTYTWO) {
        alert(localize(TEXT_BIT_DEPTH_ALERT, TEXT_SCRIPT_NAME), TEXT_NAME_AND_VERSION);
        return;
    }

    orgHeight       = Math.round(doc.height.as("px"));
    orgWidth        = Math.round(doc.width.as("px"));

    showDialog();
    if (dialogReturn == false) {
        // Cancel button was selected
        return;
    }

    var orgDialogMode   = app.displayDialogs;
    try {
        app.displayDialogs  = DialogModes.ERROR;
        // Perform resizing
        doc.suspendHistory(TEXT_SCRIPT_NAME, "execResize()");
        //execResize(); //debug
    }
    catch (e) {
        alert(e.toString() + "\r" + TEXT_UNDO_ALERT, TEXT_NAME_AND_VERSION, true);
    }
    finally {
        app.displayDialogs = orgDialogMode;
    }
}

// Show and handle the main dialog
function showDialog() {
    var wValue          = orgWidth;                 // New width (pixel)
    var hValue          = orgHeight;                // New height (pixel)
    var pValue          = 10000;                    // Resize ratio (multiplied by 10000)
    var workText;
    var workHValue, workWValue, workPValue;
    var dialogResource  =
    "dialog { \
        text: '" + TEXT_NAME_AND_VERSION + "', orientation:'column', \
        sizeGrp: Group { \
            orientation:'row', \
            whGrp: Group { \
                orientation:'column', \
                margins: [0, 0, 20, 0], \
                wGrp: Group { \
                    orientation:'row', \
                    alignment:'right', \
                    cap: StaticText { text: '" + TEXT_WIDTH_CAPTION + "' }, \
                    et: EditText { text: " + String(wValue) + ", characters: 6 } \
                    unit: StaticText { text: 'pixel' } \
                }, \
                hGrp: Group { \
                    orientation:'row', \
                    alignment:'right', \
                    cap: StaticText { text: '" + TEXT_HEIGHT_CAPTION + "' }, \
                    et: EditText { text: '" + String(hValue) + "', characters: 6 } \
                    unit: StaticText { text: 'pixel' } \
                } \
            }, \
            percentGrp: Group { \
                orientation: 'row', \
                margins: [0, 0, 0, 0], \
                et: EditText { text: '" + String(pValue / 100) + "', characters: 8 } \
                unit: StaticText { text: '%' } \
            } \
        }, \
        optionGrp: Group { \
            orientation:'column', \
            alignment:'center', \
            resizeStylesChk: Checkbox { \
                alignment:'left', text:'" + TEXT_SCALE_STYLES_CAPTION + "', value:true \
            }, \
            simulateDotGainChk: Checkbox { \
                alignment:'left', text:'" + TEXT_SIMULATE_DOT_GAIN_CAPTION + "', value:false \
            } \
        }, \
        btnsGrp: Group { \
            orientation:'row', \
            okBtn: Button { text:'" + TEXT_OK_CAPTION + "', properties:{name:'ok'} }, \
            cancelBtn: Button { text:'" + TEXT_CANCEL_CAPTION + "', properties:{name:'cancel'} } \
        } \
    }";

    var sizeDialog  = new Window(dialogResource);

    // Event handlers

    sizeDialog.onShow = function () {
        sizeDialog.center();
    }

    // OK button
    sizeDialog.btnsGrp.okBtn.onClick = function () {
        newHeight       = hValue;
        newWidth        = parseInt(sizeDialog.sizeGrp.whGrp.wGrp.et.text, 10);
        if (newHeight < VALUE_MIN_SIZE) {
            newHeight       = VALUE_MIN_SIZE;
        }
        if (newWidth < VALUE_MIN_SIZE) {
            newWidth        = VALUE_MIN_SIZE;
        }

        resizeStyles    = sizeDialog.optionGrp.resizeStylesChk.value;
        simulateDotGain = sizeDialog.optionGrp.simulateDotGainChk.value;

        if (newHeight != orgHeight || newWidth != orgWidth) {
            dialogReturn    = true;
        }
        else {
            // No need of resizing
            dialogReturn    = false;
        }
        sizeDialog.close();
    }

    // Cancel button
    sizeDialog.btnsGrp.cancelBtn.onClick = function () {
        dialogReturn    = false;
        sizeDialog.close();
    }

    // The height value is changing
    sizeDialog.sizeGrp.whGrp.hGrp.et.onChanging = function () {
        try {
            if (sizeDialog.sizeGrp.whGrp.hGrp.et.text.match(/^[0-9]+$/)) {
                // The format is valid

                // Check new height
                workText    = sizeDialog.sizeGrp.whGrp.hGrp.et.text;
                workHValue  = parseInt(workText, 10);
                if (workHValue < VALUE_MIN_SIZE) {
                    // Set current height to minimum if new value is too small
                    // (Do not change displayed value here)
                    workHValue  = VALUE_MIN_SIZE;
                }
                else if (workHValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new height is too big
                    sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                    return;
                }
                // Check new width
                workWValue  = Math.round(orgWidth * workHValue / orgHeight);
                if (workWValue < VALUE_MIN_SIZE) {
                    // Set current width to minimum if new value is too small
                    workWValue  = VALUE_MIN_SIZE;
                }
                else if (workWValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new width is too big
                    sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                    return;
                }
                hValue      = workHValue;
                wValue      = workWValue;
                pValue      = Math.round(hValue * 10000 / orgHeight);
                sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
                sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
            }
            else if (sizeDialog.sizeGrp.whGrp.hGrp.et.text == "") {
                hValue      =
                workHValue  = VALUE_MIN_SIZE;
                workWValue  = Math.round(orgWidth * workHValue / orgHeight);
                if (workWValue < VALUE_MIN_SIZE) {
                    workWValue  = VALUE_MIN_SIZE;
                }
                wValue      = workWValue;
                pValue      = Math.round(hValue * 10000 / orgHeight);
                sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
                sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
            }
            else {
                // Cancel the change if new value is invalid
                sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
            }
        }
        catch (e) {
            sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
        }
    }

    // The width value is changing
    sizeDialog.sizeGrp.whGrp.wGrp.et.onChanging = function () {
        try {
            if (sizeDialog.sizeGrp.whGrp.wGrp.et.text.match(/^[0-9]+$/)) {
                // The format is valid

                // Check new width
                workText    = sizeDialog.sizeGrp.whGrp.wGrp.et.text;
                workWValue  = parseInt(workText, 10);
                if (workWValue < VALUE_MIN_SIZE) {
                    // Set current width to minimum if new value is too small
                    // (Do not change displayed value here)
                    workWValue  = VALUE_MIN_SIZE;
                }
                else if (workWValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new width is too big
                    sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
                    return;
                }
                // Check new height
                workHValue  = Math.round(orgHeight * workWValue / orgWidth);
                if (workHValue < VALUE_MIN_SIZE) {
                    // Set current height to minimum if new value is too small
                    workHValue  = VALUE_MIN_SIZE;
                }
                else if (workHValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new height is too big
                    sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
                    return;
                }
                wValue      = workWValue;
                hValue      = workHValue;
                pValue      = Math.round(wValue * 10000 / orgWidth);
                sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
            }
            else if (sizeDialog.sizeGrp.whGrp.wGrp.et.text == "") {
                // Set the minimum value if the text is empty
                wValue      =
                workWValue  = VALUE_MIN_SIZE;
                workHValue  = Math.round(orgHeight * workWValue / orgWidth);
                if (workHValue < VALUE_MIN_SIZE) {
                    workHValue  = VALUE_MIN_SIZE;
                }
                hValue      = workHValue;
                pValue      = Math.round(wValue * 10000 / orgWidth);
                sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
            }
            else {
                // Cancel the change if new value is invalid
                sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
            }
        }
        catch (e) {
            sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
        }
    }

    // The percent value is changing
    sizeDialog.sizeGrp.percentGrp.et.onChanging = function () {
        try {
            if (sizeDialog.sizeGrp.percentGrp.et.text.match(/^[0-9]+$/) ||
                sizeDialog.sizeGrp.percentGrp.et.text.match(/^[0-9]+\.[0-9]*$/) ||
                sizeDialog.sizeGrp.percentGrp.et.text.match(/^\.[0-9]+$/)
            ) {
                // The format is valid

                // Check new height and width
                workPValue  = Math.round(parseFloat(sizeDialog.sizeGrp.percentGrp.et.text) * 100);
                workHValue  = Math.round(orgHeight * workPValue / 10000);
                workWValue  = Math.round(orgWidth * workPValue / 10000);
                if (workHValue < VALUE_MIN_SIZE) {
                    workHValue  = VALUE_MIN_SIZE;
                }
                else if (workHValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new height is too big
                    sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
                    return;
                }
                if (workWValue < VALUE_MIN_SIZE) {
                    workWValue  = VALUE_MIN_SIZE;
                }
                else if (workWValue > VALUE_MAX_SIZE) {
                    // Cancel the change if new width is too big
                    sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
                    return;
                }
                pValue      = workPValue;
                hValue      = workHValue;
                wValue      = workWValue;
                sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
            }
            else if (sizeDialog.sizeGrp.percentGrp.et.text == "" ||
                     sizeDialog.sizeGrp.percentGrp.et.text == "."
            ) {
                // Set the minimum value if the text is empty
                pValue      = 0;
                hValue      = VALUE_MIN_SIZE;
                wValue      = VALUE_MIN_SIZE;
                sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
                sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
            }
            else {
                // Cancel the change if new value is invalid
                sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
            }
        }
        catch (e) {
            sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
        }
    }

    sizeDialog.sizeGrp.whGrp.hGrp.et.onChange = function () {
        sizeDialog.sizeGrp.whGrp.hGrp.et.text   = String(hValue);
    }

    sizeDialog.sizeGrp.whGrp.wGrp.et.onChange = function () {
        sizeDialog.sizeGrp.whGrp.wGrp.et.text   = String(wValue);
    }

    sizeDialog.sizeGrp.percentGrp.et.onChange = function () {
        sizeDialog.sizeGrp.percentGrp.et.text   = String(pValue / 100);
    }

    sizeDialog.show();
}

// Perform resizing
function execResize() {
    var wrkHeight,  uvHeight;
    var wrkWidth,   uvWidth;
    var searchCnt;
    var sizeRatio,  iterationNum,   iterationCnt;
    var targetSize, checkSize;
    var blurSize;

    if (newWidth / orgWidth < newHeight / orgHeight) {
        targetSize      = orgWidth;
        checkSize       = newWidth;
    }
    else {
        targetSize      = orgHeight;
        checkSize       = newHeight;
    }

    sizeRatio       = checkSize / targetSize;

    // Calculate iteration number
    // Scaling to a smaller size than 25% can cause moiré patterns even if the color space is linear one
    // (a bug of Photoshop?)
    iterationNum    = 1;
    wrkHeight       = newHeight;
    wrkWidth        = newWidth;
    for (checkSize *= 4; checkSize < targetSize; checkSize *= 4) {
        wrkHeight       *= 4;
        wrkWidth        *= 4;
        iterationNum++;
    }

    if (orgBits != BitsPerChannelType.SIXTEEN) {
        doc.bitsPerChannel   = BitsPerChannelType.SIXTEEN;
    }

    var cProf           = doc.colorProfileType;
    // Change color profile type to "WORKING" if current profile is "NONE"
    if (cProf == ColorProfile.NONE) {
        doc.colorProfileType = ColorProfile.WORKING;
    }

    // Get the name of color profile
    var profName    = doc.colorProfileName;

    if ((resizeStyles == true)                          ||  // If resizing of layer styles,
        (simulateDotGain == true && sizeRatio < 1)      ||  // dot gain simulation, or
        (simulateDotGain == false && iterationNum > 1)) {   // blurring will be performed
        showAllLayers(doc);
    }

    // Simple simulation of dot gain by blurring before color conversion
    if (simulateDotGain == true && sizeRatio < 1) {
        blurSize    = (1 / sizeRatio - 1) / 3.5;
        if (blurSize >= 0.1) {
            if (blurSize > 250) {
                blurSize    = 250;
            }
            for (searchCnt = 0; searchCnt < layerArray.length; searchCnt++) {
                if (layerArray[ searchCnt ].obj.kind == LayerKind.NORMAL) {
                    layerArray[ searchCnt ].obj.applyGaussianBlur(blurSize);
                }
            }
        }
    }

    // Convert to a temporary linear profile
    if (orgMode == DocumentMode.GRAYSCALE) {
        convertToLinearGray();
    }
    else {
        convertToLinearRGB();
    }

    // Blurring
    // This blurring is so weak that downscaled images will seem to be nothing differrent in most cases,
    // but it prevents moire effectively.
    if (simulateDotGain == false && iterationNum > 1) {
        blurSize    = 0.125 / sizeRatio;
        if (blurSize > 250) {
            blurSize    = 250;
        }
        for (searchCnt = 0; searchCnt < layerArray.length; searchCnt++) {
            if (layerArray[ searchCnt ].obj.kind == LayerKind.NORMAL) {
                layerArray[ searchCnt ].obj.applyGaussianBlur(blurSize);
            }
        }
    }

    uvHeight    = new UnitValue(0, "px");
    uvWidth     = new UnitValue(0, "px");
    for (iterationCnt = 0; iterationCnt < iterationNum; wrkHeight /= 4, wrkWidth /= 4, iterationCnt++) {
        uvHeight.value  = wrkHeight;
        uvWidth.value   = wrkWidth;
        if (sizeRatio < 1) {
            if (uvHeight.value > orgHeight) {
                uvHeight.value  = orgHeight;
            }
            if (uvWidth.value > orgWidth) {
                uvWidth.value   = orgWidth;
            }
        }
        doc.resizeImage(uvWidth, uvHeight, doc.resolution, ResampleMethod.BICUBIC);
    }

    // Restore original settings
    try {
        doc.convertProfile(profName, Intent.PERCEPTUAL, true, true);
    }
    catch (e) {
        if (orgMode == DocumentMode.GRAYSCALE) {
            alert(localize(TEXT_GRAY_PROFILE_ALERT, profName), TEXT_NAME_AND_VERSION, true);
            doc.convertProfile("Working Gray", Intent.PERCEPTUAL, true, true);
        }
        else {
            alert(localize(TEXT_RGB_PROFILE_ALERT, profName), TEXT_NAME_AND_VERSION, true);
            doc.convertProfile("Working RGB", Intent.PERCEPTUAL, true, true);
        }
    }
    if (cProf == ColorProfile.NONE) {
        doc.colorProfileType = ColorProfile.NONE;
    }
    if (orgBits != BitsPerChannelType.SIXTEEN) {
        doc.bitsPerChannel   =   orgBits;
    }

    if (resizeStyles == true) {
        // Resize layer styles
        execResizeStyles(doc, sizeRatio);
    }

    if (layerArray.length > 0) {
        // Restore properties of layers if showAllLayers() has been called
        doc.activeLayer = orgActiveLayer;
        restoreLayersProperties();
    }
}

// Convert color profile to a temporary linear RGB profile
function convertToLinearRGB() {
    var idconvertToProfile = stringIDToTypeID("convertToProfile");
        var desc    = new ActionDescriptor();
        var ref     = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        desc.putReference(charIDToTypeID("null"), ref);
        desc.putData(charIDToTypeID("T   "), String.fromCharCode(
            0, 0, 2, 0, 65, 68, 66, 69, 2, 16, 0, 0, 109, 110, 116, 114, 82, 71, 66, 32, 88, 89, 90, 32, 7, 223, 0, 5, 0, 28, 0, 13,
            0, 4, 0, 42, 97, 99, 115, 112, 65, 80, 80, 76, 0, 0, 0, 0, 110, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 246, 214, 0, 1, 0, 0, 0, 0, 211, 44, 65, 68, 66, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 9, 99, 112, 114, 116, 0, 0, 0, 240, 0, 0, 0, 50, 100, 101, 115, 99, 0, 0, 1, 36, 0, 0, 0, 122, 119, 116, 112, 116,
            0, 0, 1, 160, 0, 0, 0, 20, 114, 88, 89, 90, 0, 0, 1, 180, 0, 0, 0, 20, 103, 88, 89, 90, 0, 0, 1, 200, 0, 0, 0, 20,
            98, 88, 89, 90, 0, 0, 1, 220, 0, 0, 0, 20, 114, 84, 82, 67, 0, 0, 1, 240, 0, 0, 0, 14, 103, 84, 82, 67, 0, 0, 1, 240,
            0, 0, 0, 14, 98, 84, 82, 67, 0, 0, 1, 240, 0, 0, 0, 14, 116, 101, 120, 116, 0, 0, 0, 0, 67, 111, 112, 121, 114, 105, 103, 104,
            116, 32, 50, 48, 49, 53, 32, 65, 100, 111, 98, 101, 32, 83, 121, 115, 116, 101, 109, 115, 32, 73, 110, 99, 111, 114, 112, 111, 114, 97, 116, 101,
            100, 0, 0, 0, 100, 101, 115, 99, 0, 0, 0, 0, 0, 0, 0, 32, 67, 76, 69, 65, 82, 101, 115, 105, 122, 101, 32, 84, 101, 109, 112, 111,
            114, 97, 114, 121, 32, 76, 105, 110, 101, 97, 114, 32, 82, 71, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 246, 220, 0, 1, 0, 0, 0, 0, 211, 58, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 204, 56,
            0, 0, 73, 190, 0, 0, 0, 0, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 34, 154, 0, 0, 182, 61, 0, 0, 0, 1, 88, 89, 90, 32,
            0, 0, 0, 0, 0, 0, 8, 4, 0, 0, 0, 5, 0, 0, 211, 43, 99, 117, 114, 118, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0
        ));
        desc.putEnumerated(charIDToTypeID("Inte"), charIDToTypeID("Inte"), charIDToTypeID("Img "));
        desc.putBoolean(charIDToTypeID("MpBl"), true);
        desc.putInteger(charIDToTypeID("sdwM"), -1);
    executeAction(idconvertToProfile, desc, DialogModes.NO);
}

// Convert color profile to a temporary linear gray profile
function convertToLinearGray() {
    var idconvertToProfile = stringIDToTypeID("convertToProfile");
        var desc    = new ActionDescriptor();
        var ref     = new ActionReference();
        ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
        desc.putReference(charIDToTypeID("null"), ref);
        desc.putData(charIDToTypeID("T   "), String.fromCharCode(
            0, 0, 1, 136, 65, 68, 66, 69, 2, 16, 0, 0, 109, 110, 116, 114, 71, 82, 65, 89, 88, 89, 90, 32, 7, 223, 0, 5, 0, 18, 0, 10,
            0, 57, 0, 48, 97, 99, 115, 112, 65, 80, 80, 76, 0, 0, 0, 0, 110, 111, 110, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 246, 214, 0, 1, 0, 0, 0, 0, 211, 44, 65, 68, 66, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 4, 99, 112, 114, 116, 0, 0, 0, 180, 0, 0, 0, 50, 100, 101, 115, 99, 0, 0, 0, 232, 0, 0, 0, 123, 119, 116, 112, 116,
            0, 0, 1, 100, 0, 0, 0, 20, 107, 84, 82, 67, 0, 0, 1, 120, 0, 0, 0, 14, 116, 101, 120, 116, 0, 0, 0, 0, 67, 111, 112, 121,
            114, 105, 103, 104, 116, 32, 50, 48, 49, 53, 32, 65, 100, 111, 98, 101, 32, 83, 121, 115, 116, 101, 109, 115, 32, 73, 110, 99, 111, 114, 112, 111,
            114, 97, 116, 101, 100, 0, 0, 0, 100, 101, 115, 99, 0, 0, 0, 0, 0, 0, 0, 33, 67, 76, 69, 65, 82, 101, 115, 105, 122, 101, 32, 84,
            101, 109, 112, 111, 114, 97, 114, 121, 32, 76, 105, 110, 101, 97, 114, 32, 71, 114, 97, 121, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 88, 89, 90, 32, 0, 0, 0, 0, 0, 0, 243, 84, 0, 1, 0, 0, 0, 1, 22, 208, 99, 117, 114, 118, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 0, 0, 0
        ));
        desc.putEnumerated(charIDToTypeID("Inte"), charIDToTypeID("Inte"), charIDToTypeID("Img "));
        desc.putBoolean(charIDToTypeID("MpBl"), true);
        desc.putInteger(charIDToTypeID("sdwM"), -1);
    executeAction(idconvertToProfile, desc, DialogModes.NO);
}

// Show all layers and memorize status of layers and layer sets
function showAllLayers(obj) {
    var searchCnt;
    var tempObj;

    for (searchCnt = 0; searchCnt < obj.artLayers.length; searchCnt++) {
        tempObj = new classObjectStatus(obj.artLayers[ searchCnt ], obj.artLayers[ searchCnt ].visible, obj.artLayers[ searchCnt ].allLocked);
        if (obj.artLayers[ searchCnt ].visible == false) {
            obj.artLayers[ searchCnt ].visible      = true;
        }
        if (obj.artLayers[ searchCnt ].allLocked == true) {
            obj.artLayers[ searchCnt ].allLocked    = false;
        }

        layerArray.push(tempObj);
    }
    for (searchCnt = 0; searchCnt < obj.layerSets.length; searchCnt++) {
        tempObj = new classObjectStatus(obj.layerSets[ searchCnt ], obj.layerSets[ searchCnt ].visible, obj.layerSets[ searchCnt ].allLocked);
        if (obj.layerSets[ searchCnt ].visible == false) {
            obj.layerSets[ searchCnt ].visible      = true;
        }
        if (obj.layerSets[ searchCnt ].allLocked == true) {
            obj.layerSets[ searchCnt ].allLocked    = false;
        }

        showAllLayers(obj.layerSets[ searchCnt ]);      // Recursive call

        layerSetArray.push(tempObj);
    }
}

// Restore status of layers and layer sets
function restoreLayersProperties() {
    var searchCnt;
    var tempObj;

    for (searchCnt = 0; searchCnt < layerArray.length; searchCnt++) {
        if (layerArray[ searchCnt ].obj.allLocked != layerArray[ searchCnt ].allLocked) {
            layerArray[ searchCnt ].obj.allLocked       = layerArray[ searchCnt ].allLocked;
        }
    }
    for (searchCnt = 0; searchCnt < layerSetArray.length; searchCnt++) {
        if (layerSetArray[ searchCnt ].obj.allLocked != layerSetArray[ searchCnt ].allLocked) {
            layerSetArray[ searchCnt ].obj.allLocked    = layerSetArray[ searchCnt ].allLocked;
        }
    }
    for (searchCnt = 0; searchCnt < layerArray.length; searchCnt++) {
        if (layerArray[ searchCnt ].obj.visible != layerArray[ searchCnt ].visible) {
            layerArray[ searchCnt ].obj.visible     = layerArray[ searchCnt ].visible;
        }
    }
    for (searchCnt = 0; searchCnt < layerSetArray.length; searchCnt++) {
        if (layerSetArray[ searchCnt ].obj.visible != layerSetArray[ searchCnt ].visible) {
            layerSetArray[ searchCnt ].obj.visible  = layerSetArray[ searchCnt ].visible;
        }
    }
}

// Resize layer styles
function execResizeStyles(obj, sizeRatio) {
    var searchCnt;
    var ref     = new ActionReference();
    var desc1;
    var desc2   = new ActionDescriptor();

    ref.putEnumerated(charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    // Loop all layers in obj
    for (searchCnt = 0; searchCnt < obj.artLayers.length; searchCnt++) {
        doc.activeLayer = obj.artLayers[ searchCnt ];
        desc1 = executeActionGet(ref);

        if (desc1.hasKey(charIDToTypeID("Lefx")) == true) {
            // Selected layer has layer styles
            try {
                // Perform style resizing
                desc2.putUnitDouble(charIDToTypeID("Scl "), charIDToTypeID("#Prc"), sizeRatio * 100);
                executeAction(stringIDToTypeID("scaleEffectsEvent"), desc2, DialogModes.NO);
            }
            catch (e) {
                // Do nothing
            }
        }
    }

    // Loop all layer sets in obj
    for (searchCnt = 0; searchCnt < obj.layerSets.length; searchCnt++) {
        execResizeStyles(obj.layerSets[ searchCnt ], sizeRatio);    // Recursive call
    }
}

////////////////////////////////////////////////////////////
// Execution
////////////////////////////////////////////////////////////

app.bringToFront();

main();
