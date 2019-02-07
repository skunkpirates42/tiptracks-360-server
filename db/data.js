const users = [
  {
    fullName: 'Bob User',
    username: 'bobuser',
    // hash digest for string 'password'
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
    _id: '000000000000000000000001',
    tips: ['200000000000000000000001', '200000000000000000000002']
  },
  {
    fullName: 'Bob User1',
    username: 'bobuser1',
    // hash digest for string 'password'
    password: '$2a$10$QJCIX42iD5QMxLRgHHBJre2rH6c6nI24UysmSYtkmeFv6X8uS1kgi',
    _id: '000000000000000000000002',
    tips: ['200000000000000000000003', '200000000000000000000004']
  }
];

const tips = [
  {
    _id: '200000000000000000000005',
    date: '2018-12-04',
    formattedDate: 'Tuesday, December 4th 2018',
    baseWage: '5.25',
    hours: '5',
    notes: 'some notes here',
    tippedOut: '10',
    totalTips: '170',
    userId: '000000000000000000000001'
  },
  {
    _id: '200000000000000000000001',
    date: '2019-02-04',
    formattedDate: 'Monday, February 4th 2019',
    baseWage: '5.25',
    hours: '5',
    notes: 'sdfsfs',
    tippedOut: '10',
    totalTips: '170',
    userId: '000000000000000000000001'
  },
  {
    _id: '200000000000000000000002',
    date: '2019-01-30',
    formattedDate: 'Wednesday, January 30th 2019',
    baseWage: '5.25',
    hours: '6',
    notes: 'lorum ipsum...',
    tippedOut: '15',
    totalTips: '180',
    userId: '000000000000000000000001'
  },
  {
    _id: '200000000000000000000003',
    date: '2019-02-04',
    formattedDate: 'Monday, February 4th 2019',
    baseWage: '5',
    hours: '5',
    notes: 'sdfsfs',
    tippedOut: '5',
    totalTips: '90',
    userId: '000000000000000000000002'
  },
  {
    _id: '200000000000000000000004',
    date: '2019-02-05',
    formattedDate: 'Tuesday, February 5th 2019',
    baseWage: '5',
    hours: '4',
    notes: 'sdfsfs',
    tippedOut: '5',
    totalTips: '120',
    userId: '000000000000000000000002'
  },
];

module.exports = { users, tips };