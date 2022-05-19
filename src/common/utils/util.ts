export class Util {
  static formatString = (
    value: any,
    size = 16,
    str = " ",
    side = "left"
  ): string => {
    const length = size - value.toString().length + 1;
    if (length < 0) return value;
    if (isNaN(value.toString().trim())) side = "right";
    const stringFormat =
      side === "left"
        ? Array(length).join(str) + value
        : value + Array(length).join(str);
    return stringFormat;
  };

  static isEmptyField = (field: number | string | []): boolean => {
    if (field == null || field === "" || field == 0 || field == []) return true;
    return false;
  };

  /**
   * Verificar se o objeto é vazio
   * @param element
   * @returns true se vazio
   */
  static isEmptyObject = (element: Object) => Object.keys(element).length === 0;

  /**
   * Ajuste decimal de um número.
   *
   * @param	{String}	type	O tipo de arredondamento.
   * @param	{Number}	value	O número a arredondar.
   * @returns	{Number}			O valor depois de ajustado.
   */
  static decimalAdjust(value: number, type: string) {
    let result;
    if (type === "round") result = Math.round(value);

    if (type === "floor") result = Math.floor(value);

    if (type === "ceil") result = Math.ceil(value);

    return Number(result);
  }

  static isValidList(item: any) {
    return item && item.length;
  }

  static isValidString(string: string) {
    for (let i = 0; i < string.length; i++) {
      if (string.charCodeAt(i) < 32 || string.charCodeAt(i) > 255) {
        return false;
      }
    }
    return true;
  }
}
