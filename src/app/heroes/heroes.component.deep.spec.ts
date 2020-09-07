import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {HeroService} from '../hero.service';
import {HeroComponent} from '../hero/hero.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {of} from 'rxjs/internal/observable/of';
import {By} from '@angular/platform-browser';
import {forEach} from '@angular/router/src/utils/collection';
import {Hero} from '../hero';

describe('HeroesComponent (deep tests)', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 },
    ];
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', function () {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);

    // for ( const i in heroComponentDEs) {
    //   expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    // }

    for (let i = 0; i < heroComponentDEs.length; i++ ) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, function () {
    spyOn(fixture.componentInstance, 'delete');
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    // Tipo 1 => uma forma
    // heroComponents[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});
    // Tipo  2 => segunda forma
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);
    // Tipo  3 => tercera forma
    heroComponents[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });
});
