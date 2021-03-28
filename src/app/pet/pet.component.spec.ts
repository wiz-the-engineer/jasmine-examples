import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { Pet, PetStore, Status } from '../generated-code/pet-store.service';

import { PetComponent } from './pet.component';

describe('PetComponent', () => {
  let component: PetComponent;
  let fixture: ComponentFixture<PetComponent>;
  const petResponse = [
    new Pet({
      id: 1,
      name: 'Snoopy',
      photoUrls: undefined
    }),
    new Pet({
      id: 2,
      name: 'Old Yeller',
      photoUrls: undefined
    }),
  ];

 /* In any .Net unit testing framwork, there's the concept of mocks.  You can could be using a library like NSubstitute, Moq, or
  * something similar and you'll run into the same concepts.  You should always mock dependencies so you can control the behavior
  * of them.  As with any mock, you can setup what gets returned when some method gets called.  You can also verify that the method
  * has been called.  So, if you've used "myMock.Setup(x => x.SomeMethod()).Returns(junk);" you can get use to using Spies.  They're
  * the same concept with a different syntax.
  */
  const petStoreSpy = jasmine.createSpyObj('PetStoreService', ['findPetsByStatus'], { someProperty: undefined});
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetComponent ],
      providers: [
        { provide: PetStore, useValue: petStoreSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // Using "of(something)" turns that something into an Observable<TypeOfSomething>
    petStoreSpy.findPetsByStatus.and.returnValue(of(petResponse));
    fixture = TestBed.createComponent(PetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    petStoreSpy.findPetsByStatus.calls.reset();
  });

  // afterEach(() => {
  //   petStoreSpy.findPetsByStatus.calls.reset();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call findPetByStatus on init', () => {
    // This is called before the test --> petStoreSpy.findPetsByStatus.and.returnValue(of(petResponse));
    // This is also called before the test --> petStoreSpy.findPetsByStatus.calls.reset();
    // Act
    component.ngOnInit();
    
    // Assert
    expect(petStoreSpy.findPetsByStatus).toHaveBeenCalled();
    expect(petStoreSpy.findPetsByStatus).toHaveBeenCalledTimes(1);
    expect(petStoreSpy.findPetsByStatus).toHaveBeenCalledWith([Status.Available]);
  });
  
  it('should retrieve multiple pets on init (using done)', done => {
    // Arrange
    component.pets = [];
    
    // Act
    component.ngOnInit();
    
    // Assert
    component.pets$.subscribe(_ => {
      expect(component.pets.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should retrieve multiple pets on init (fakeAsync)', fakeAsync(() => {
    // Arrange
    component.pets = [];

    // Act
    component.ngOnInit();
    // tick();
    flush();

    // Assert
    expect(component.pets.length).toBeGreaterThan(0);
  }));


  /* I'm sure you've probably used either an xUnit.net Theory, nUnit TestCase, or MSTest DataTestMethod before
   * This is the equivalent in jasmine.  It's simply a foreach loop with the test data.  You can alternatively
   * create objects with the correct test cases so that you can assert on each outcome as well.
   */
  [1, 2, 3, 4, 5, 6]
  .forEach(numCharacters => {
    it(`should show all pets with a name length greater than ${numCharacters} characters`, fakeAsync(() => {
      // Arrange
      component.pets = [];
  
      // Act
      component.ngOnInit();
      // tick();
      flush();
  
      // Assert
      expect(component.pets.length).toBeGreaterThan(0);
      expect(component.pets).toEqual(component.pets.filter(x => x.name.length > numCharacters));
    }));
  });
});
