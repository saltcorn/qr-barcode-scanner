const {
  input,
  div,
  text,
  text_attr,
  script,
  domReady,
  textarea,
  button,
  i,
  style,
  video,
} = require("@saltcorn/markup/tags");
const File = require("@saltcorn/data/models/file");
const User = require("@saltcorn/data/models/user");
const { features } = require("@saltcorn/data/db/state");

const headers = [
  {
    script: `/plugins/public/qr-scanner@${
      require("./package.json").version
    }/html5-qrcode.min.js`,
  },
];

const QRscanner = {
  type: "String",
  isEdit: true,
  //configFields: standardConfigFields,
  run: (nm, v, attrs, cls, required, header) => {
    const rndcls = `qr${Math.floor(Math.random() * 16777215).toString(16)}`;
    return div(
      div({
        id: `reader_${rndcls}`,
        width: "600px",
      }),

      script(
        domReady(`
function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log("Code matched", decodedText, decodedResult);
  common_done({set_fields: {${nm}: decodedText}}, $('#reader_${rndcls}'))
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  //console.warn("Code scan error", error);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  "reader_${rndcls}",
  { 
            fps: 10,
            qrbox: {width: 400, height: 400},
            experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
            },
            rememberLastUsedCamera: true,
            showTorchButtonIfSupported: true
        },
  //{ fps: 10},//, qrbox: {width: 400, height: 400} },
  /* verbose= */ false);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
`),
      ),
    );
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { QRscanner },
  plugin_name: "qr-scanner",
  headers,
};
