import moment from "moment-timezone"; //TODO verificar se devemos isolar o timezone e usar um adapter
import { config } from "../../config/index";

export class UtilDate {
  static getActualDate = (format = "YYYYMMDD"): string => {
    const todayDate = moment().tz(config.timezone).format(format);
    return todayDate;
  };

  static getPreviousDate = (days: number, format = "YYYYMMDD"): string => {
    const todayDate = moment()
      .tz(config.timezone)
      .subtract(days, "days")
      .format(format);
    return todayDate;
  };

  static getActualTime = (): number => {
    return moment()
      .tz(config.timezone)
      .diff(moment().tz(config.timezone).startOf("day"), "seconds");
  };

  static timeStampToDate(timeStamp: number) {
    const data = moment
      .tz(moment.unix(timeStamp), config.timezone)
      .format("YYYY-MM-DD HH:mm");

    return data;
  }

  static strPtBrToEUA(str: string) {
    const data = moment(str, "DD/MM/YYYY HH:mm");
    return data.format("YYYY-MM-DD HH:mm");
  }

  /**
   * Compara duas datas
   * @param date1 {Date}
   * @param date2 {Date}
   * @returns 0 - As duas datas são iguais
   *          1 - A primeira data é maior do que a segunda
   *          2 - A segunda data é maior do que a primeira
   */
  static compareDate = (date1: Date, date2: Date): number => {
    let response = 0;
    if (date1.getTime() > date2.getTime()) response = 1;
    if (date1.getTime() < date2.getTime()) response = 2;

    return response;
  };

  /**
   * Converte uma string para data GMT-3
   * @param str
   * @returns data convertida
   */
  static strToDate = (str: string): Date => new Date(`${str} GMT-03:00`);

  /**
   *
   * @returns {Date} nova data no formato americano
   */
  static currentDate = () => new Date();

  static formatToIsoString = (date: string | Date) => moment(date).tz(config.timezone).toISOString(true);
}
