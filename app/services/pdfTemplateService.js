angular.module('EfgInfoApp.PdfTemplateService', []).
service('PdfTemplateService', function () {
    pdfMake.fonts = {
        sourceSansPro: {
            normal: 'SourceSansPro-Light.ttf',
            bold: 'SourceSansPro-Semibold.ttf',
            italics: 'SourceSansPro-LightItalic.ttf',
            bolditalics: 'SourceSansPro-SemiboldItalic.ttf'
        },
        sourceSansProRegular: {
            normal: 'SourceSansPro-Regular.ttf',
            bold: 'SourceSansPro-Bold.ttf',
            italics: 'SourceSansPro-Italic.ttf',
            bolditalics: 'SourceSansPro-BoldItalic.ttf'
        }
    };

    var content = {
        table: {
            widths: [472, 472],
            headerRows: 0,
            body: []
        },
        layout: 'noBorders',
        style: 'textRegular'
    };
    this.setTableContent = function (obj) {
        var body = [];
        angular.forEach(obj, function (item) {
            var newRow = [{
                text: item.left,
                alignment: 'right',
                style: 'textRegularSemiBold'
                }, {
                text: item.right,
                alignment: 'left',
                style: 'textRegular'
                }];
            body.push(newRow);
        });
        content.table.body = body;
        console.log(obj);
    };
    var fileName = "test.pdf";
    this.setFileName = function (newFileName) {
        fileName = newFileName;
    };
    // open the PDF in a new window
    this.openPDF = function () {
        pdfMake.createPdf(this.getDocDefinition()).open();
    };
    // print the PDF (temporarily Chrome-only)
    this.printPDF = function () {
        pdfMake.createPdf(this.getDocDefinition()).print();
    };
    // download the PDF (temporarily Chrome-only)
    this.downloadPDF = function () {
        pdfMake.createPdf(this.getDocDefinition()).download(fileName);
    };
    var footerText;
    var hasFooter = false;
    this.setFooterText = function (newFooterText) {
        if (newFooterText !== "")
            hasFooter = true;
        footerText = newFooterText;
    };
    var headline = "Default";
    this.setHeadline = function (newHeadline) {
        headline = newHeadline;
    };

    function getHeader() {
        return {
            margin: [10, 10, 10, 0],
            columns: [{
                    image: 'back',
                    width: 86,
                    height: 113
                    }, {
                    margin: [0, 20, 0, 0],
                    text: headline,
                    alignment: 'center',
                    style: 'header'
                    },
                {
                    image: 'logo',
                    width: 86,
                    height: 113
                }]
        };
    }

    function getFooter() {
        return {
            margin: [0, 0, 0, 0],
            layout: 'noBorders',
            table: {
                widths: [40, 944, 40],
                body: [[{
                        text: " ",
                        fillColor: '#EBEBEB'
                    }, {
                        text: " ",
                        fillColor: '#EBEBEB'
                    }, {
                        text: " ",
                        fillColor: '#EBEBEB'
                    }], [{
                        text: " ",
                        fillColor: '#EBEBEB'
                    }, {
                        text: footerText,
                        fillColor: '#EBEBEB',
                        style: 'textRegularD'
                    }, {
                        text: " ",
                        fillColor: '#EBEBEB'
                    }], [{
                        text: " ",
                        fillColor: '#EBEBEB'
                    }, {
                        text: " ",
                        fillColor: '#EBEBEB'
                    }, {
                        text: " ",
                        fillColor: '#EBEBEB'
                    }]
                ]
            }
            //            background: [
            //                {
            //                    image: 'gray',
            //                    width: 1024,
            //                    height: 200
            //            }],
            //            columns: [{
            //                text: footerText,
            //                style: 'textRegularD'
            //            }]
        };
    }
    var docDefinition = {
        defaultStyle: {
            font: 'sourceSansPro',
            color: 'white'
        },
        pageOrientation: 'landscape',
        pageSize: {
            width: 768,
            height: 1024
        },
        pageMargins: [40, 130, 40, 40],
        background: [
            {
                image: 'back',
                width: 1024,
                height: 768
        }],
        content: "",
        styles: {
            header: {
                font: 'sourceSansPro',
                fontSize: 65,
                color: '#EBEBEB'
            },
            textRegular: {
                font: 'sourceSansProRegular',
                fontSize: 28,
                color: '#EBEBEB'
            },
            textRegularSemiBold: {
                font: 'sourceSansPro',
                fontSize: 28,
                color: '#EBEBEB',
                bold: true
            },
            textRegularD: {
                font: 'sourceSansProRegular',
                fontSize: 28,
                color: '#122533'
            },
            textRegularSemiBoldD: {
                font: 'sourceSansPro',
                fontSize: 28,
                color: '#122533',
                bold: true
            }
        },
        images: {
            gray: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN4/R8AAtgB64rZ6NUAAAAASUVORK5CYII=",
            back: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMQUjX+DwACIQFqiXfXrAAAAABJRU5ErkJggg==',
            logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAJKCAYAAAC/E0VtAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAuIwAALiMBeKU/dgAABChpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjMwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MzAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NDUwPC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj41ODY8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAg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"
        }
    };


    this.getDocDefinition = function () {
        docDefinition.header = getHeader();
        if (hasFooter) {
            docDefinition.footer = getFooter();
            docDefinition.pageMargins = [40, 130, 40, 200];
        }
        docDefinition.content = content;
        return docDefinition;
    };
});
