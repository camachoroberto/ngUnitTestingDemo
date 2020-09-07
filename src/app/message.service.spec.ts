import {MessageService} from './message.service';

describe('messageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', function () {
    service.add('message1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove all message when clear is called', function () {
    service.add('message2');

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
