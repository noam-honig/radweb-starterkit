import { DateTimeColumn, DataColumnSettings, DecorateDataColumnSettings } from "radweb";

export class changeDate extends DateTimeColumn {
  constructor(optionsOrCaption: DataColumnSettings<Date, DateTimeColumn> | string) {
    super(DecorateDataColumnSettings(optionsOrCaption, x => x.readonly = true));
  }

}