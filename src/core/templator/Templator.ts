import { TProps } from "../../../types/types";

export default class Templator {
  private TEMPLATE_TAG: RegExp = /<%(.*?)?%>/g;

  private TEMPLATE_TAG_JS_CONTENT: RegExp =
    /(^( )?(for|if|else|switch|case|break|{|}))(.*)?/g;

  private _template: string;

  private props: TProps | undefined;

  constructor(template: string) {
    this._template = template;
  }

  public compile(ctx: TProps) {
    this.props = ctx;
    return this._compileTemplate();
  }

  private _compileTemplate = () => {
    const tmpl: string = this._template;
    const { props } = this;

    let templateFunc: string = "let templateFuncRows=[]; ";

    let rowStartPoint: number = 0;
    let match: any;

    const addRow = (row: string, isJavascript: boolean) => {
      if (isJavascript) {
        if (row.match(this.TEMPLATE_TAG_JS_CONTENT)) {
          templateFunc += `${row.trim()}`;
        } else {
          templateFunc += `templateFuncRows.push(${row.trim()});`;
        }
      } else if (row !== "") {
        if (row.replace(/"/g, '\\\\"').trim()) {
          templateFunc += `templateFuncRows.push("${row
            .replace(/\r?\n/g, "")
            .replace(/"/g, '\\"')
            .trim()}");`;
        }
      } else {
        templateFunc += "";
      }
      return addRow;
    };


    while ((match = this.TEMPLATE_TAG.exec(tmpl))) {

      addRow(tmpl.slice(rowStartPoint, match.index), false)(match[1], true);
      rowStartPoint = match.index + match[0].length;
    }

    addRow(tmpl.substr(rowStartPoint, tmpl.length - rowStartPoint), false);
    templateFunc += 'return templateFuncRows.join("");';
    return new Function(templateFunc).apply(props);
  };
}
