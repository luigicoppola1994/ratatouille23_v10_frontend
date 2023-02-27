import { User } from './user.request.dto';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
