import { expect } from 'chai';
import sinon from 'sinon';
import 'sinon-mongoose';
import User from '../../src/models/User';



describe('User Model', () => {
  it('should create a new user', (done) => {
    const UserMock = sinon.mock(new User({ email: 'test@gmail.com', password: 'root' }));
     // @ts-ignore
    const user = UserMock.object;

    UserMock
      .expects('save')
      .yields(null);

    user.save((err: any) => {
      UserMock.verify();
      UserMock.restore();
      expect(err).to.be.null;
      done();
    });
  });

 it('should return error if user is not created', (done) => {
    const UserMock = sinon.mock(new User({ email: 'test@gmail.com', password: 'root' }));
    // @ts-ignore
    const user = UserMock.object;
    const expectedError = {
      name: 'ValidationError'
    };

    UserMock
      .expects('save')
      .yields(expectedError);

    user.save((err: { name: any; }, result: any) => {
      UserMock.verify();
      UserMock.restore();
      expect(err.name).to.equal('ValidationError');
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should not create a user with the unique email', (done) => {
    const UserMock = sinon.mock(new User({ email: 'test@gmail.com', password: 'root' }));
     // @ts-ignore
    const user = UserMock.object;
    const expectedError = {
      name: 'MongoError',
      code: 11000
    };

    UserMock
      .expects('save')
      .yields(expectedError);

    user.save((err: { name: any; code: any; }, result: any) => {
      UserMock.verify();
      UserMock.restore();
      expect(err.name).to.equal('MongoError');
      expect(err.code).to.equal(11000);
      expect(result).to.be.undefined;
      done();
    });
  });

  it('should find user by username', (done) => {
    const userMock = sinon.mock(User);
    const expectedUser = {
      _id: '5700a128bd97c1341d8fb365',
      username: 'bibo'
    };

    userMock
      .expects('findOne')
      .withArgs({ username: 'bibo' })
      .yields(null, expectedUser);

    User.findOne({username: 'bibo' }, (err, result) => {
      userMock.verify();
      userMock.restore();
      expect(result.username).to.equal('bibo');
      done();
    });
  });

 it('should check password', (done) => {
    const UserMock = sinon.mock(new User({
      username: 'bibo',
      password: '$2b$10$LhjJj5s1pLY/I4eCRaHaB.Fli8NBT8z1L8YF4/pmVU.5pERg4Z1AC'

    }));
 // @ts-ignore
    const user = UserMock.object;
//@ts-ignore
    user.userMock('root', (err: any, isMatched: any) => {
      expect(err).to.equal(undefined);
      expect(isMatched).to.equal(true);
      done();
    });
  });

});



