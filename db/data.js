const users = [
  {
    fullName: 'Bob User',
    username: 'bobuser',
    // hash digest for string 'password'
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
  },
  {
    fullName: 'Bob User1',
    username: 'bobuser1',
    // hash digest for string 'password'
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi'
  }
];

const dailyReports = [
  {
    baseWage: '5.25',
    hours: '5',
    notes: 'sdfsfs',
    tippedOut: '10',
    totalTips: '170'
  },
  {
    baseWage: '5.25',
    hours: '6',
    notes: 'lorum ipsum...',
    tippedOut: '15',
    totalTips: '180'
  }
];

module.exports = { users, dailyReports };