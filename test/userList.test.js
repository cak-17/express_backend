const UserList = require('../api/models/users')
const { sha3_256 } = require('js-sha3')

const CREDS_OK = {
    'username': 'admin',
    'password': 'admin'
}

const CREDS_BAD = {
    'username': 'crocchi',
    'password': 'lota'
}

const mockUser = {
    username:"test1",
    firstName:"test name",
    lastName:"test last",
    password:"test",
    isSu:true,
    isStaff:true,
}

test('Should Create and add a mock user from an Object', () => {
    expect(UserList.addUserByObject(mockUser).username).toBe(mockUser.username)
})

test('Should Login the mock user', () => {
    expect(UserList.login({
        username: mockUser.username,
        password: mockUser.password
    })).toBeTruthy()
})

test('Should Login and match mock user', () => {
    const mockUserLogin = UserList.login({
        username: mockUser.username,
        password: mockUser.password
    })
    expect(mockUserLogin.username).toBe(mockUser.username)
    expect(mockUserLogin.getPassword()).toBe(sha3_256(mockUser.password))
})

test('Should match hashed passwords', () => {
    const loggedUser = UserList.login(CREDS_OK)
    expect(loggedUser.getPassword()).toBe(sha3_256(CREDS_OK.password))
})

test('Should fail login', () => {
    const failedLogin = UserList.login(CREDS_BAD)
    expect(failedLogin).toBeFalsy()
})
