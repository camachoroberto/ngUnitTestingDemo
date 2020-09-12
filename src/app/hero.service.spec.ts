import {inject, TestBed, flush} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HeroService} from './hero.service';
import {MessageService} from './message.service';

describe('HeroService', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HeroService,
        {provide: MessageService, useValue: mockMessageService}
      ]
    });

    // Tipo 1 => deixar comentado httpTestingController
    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.get(HeroService);
  });

  // Tipo 1 => forma de utilizar os servicos com inject
  // describe('getHero', () => {
  //   it('should call get with the correct URL', inject([
  //     HeroService,
  //     HttpTestingController
  //   ],
  //     (
  //       service: HeroService,
  //       controller: HttpTestingController
  //     ) => {
  //
  //     service.getHero(4).subscribe();
  //   }));
  // });

  // Tipo 2
  xdescribe('getHero', () => {

    it('should call get with the correct URL', function () {

      service.getHero(4).subscribe();

      const req = httpTestingController.expectNone('api/heroes/4');
      req.flush({id: 4, name: 'SuperDude', strength: 100});
      httpTestingController.verify();

    });
  });
});

