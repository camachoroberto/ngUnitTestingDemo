import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';
import {HeroDetailComponent} from './hero-detail.component';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';
import {of} from 'rxjs/internal/observable/of';
import {FormsModule} from '@angular/forms';

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivateRoute, mockHeroService, mockLocation;

  beforeEach(() => {

    mockActivateRoute = {
      snapshot: {
        paramMap: {get: () => '3'}
      }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivateRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render hero name in a h2 tag', function () {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  // populando un elemento y aplicando el debounce para evitar mas clicks con DONE pero no previene agregar varios registros
  // it('should  call updateHero when save is called', function (done) {
  //   mockHeroService.updateHero.and.returnValue(of());
  //   fixture.detectChanges();
  //
  //   fixture.componentInstance.save();
  //
  //   setTimeout(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //     done();
  //   }, 300);
  // });

  // teste => 2 => populando un elemento y aplicando el debounce para evitar mas clicks con DONE pero no previene agregar varios registros
  it('should  call updateHero when save is called', fakeAsync ( () => {
      mockHeroService.updateHero.and.returnValue(of());
      fixture.detectChanges();

      fixture.componentInstance.save();
      // Espera o tempo pedido manualmente pero usando flush es automatico
      // tick(250);
      flush();
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    }));

  // teste => 2 => populando un elemento y aplicando el debounce para evitar mas clicks con DONE pero no previene agregar varios registros
  // it('should call updateHero when save is called', async(() => {
  //   mockHeroService.updateHero.and.returnValue(of());
  //   fixture.detectChanges();
  //
  //   fixture.componentInstance.save();
  //
  //   fixture.whenStable().then(() => {
  //     expect(mockHeroService.updateHero).toHaveBeenCalled();
  //   });
  // }));
});
