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
    }/qr-scanner.umd.min.js`,
  },
];

const QRscanner = {
  type: "String",
  isEdit: true,
  //configFields: standardConfigFields,
  run: (nm, v, attrs, cls, required, header) => {
    const rndcls = `qr${Math.floor(Math.random() * 16777215).toString(16)}`;

    return div(
      video({
        class: rndcls,
      }),
      div(
        { class: "input-group" },
        input({
          name: text(nm),
          id: `input${text(nm)}`,
          class: rndcls,
          value: text_attr(v||""),
        }),
        script(
          domReady(`
    function setResult(result) {
        console.log("result",result);
        const input = document.querySelector('input.${rndcls}');
        input.value = result
    }
    const video = document.querySelector('video.${rndcls}');
    const scanner = new QrScanner(video, setResult);
    scanner.start();
`),
        ),
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
