import { formatDate, formatDuration } from "./formatters";

describe("#formatDate", () => {
  it("renders a date in dd/mm/yyyy format", () => {
    const date = new Date("2017-10-20");
    expect(formatDate(date)).toEqual("20/10/2017");
  });

  it("adds a 0 for single digit days and months", () => {
    const date = new Date("2017-09-01");
    expect(formatDate(date)).toEqual("01/09/2017");
  });
});

describe('#formatDuration', () => {
  it('trims the hour if the duration is under 1 hour', () => {
    const duration = '00:12:15';
    expect(formatDuration(duration)).toEqual('12:15')
  })
  
  it('shows the hour if the duration is over 1 hour', () => {
    const duration = '10:12:15';
    expect(formatDuration(duration)).toEqual('10:12:15')
  });

  it('does not remove leading zero for hours', () => {
    const duration = '01:12:15';
    expect(formatDuration(duration)).toEqual('01:12:15');
  })

  
  it('does not remove leading zero for minutes', () => {
    const duration = '10:01:15';
    expect(formatDuration(duration)).toEqual('10:01:15');
  });
})
