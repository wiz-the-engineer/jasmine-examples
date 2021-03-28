import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// declare var CircularJSON: any;
describe('AppComponent', () => {
  let myFixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    // Create fixture and component before each unit test
    myFixture = TestBed.createComponent(AppComponent);
    component = myFixture.componentInstance;
  });


  it('should create app', () => {
    expect(component).toBeTruthy();
  });

  it('should be created without a fixture', () => {
    const myComponent = new AppComponent();
    expect(myComponent).toBeTruthy();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a an element somewhere in the html with "rocket-smoke" as the id', () => {
    // If the query doesn't find anything, it returns null
    // const rocket = myFixture.nativeElement.querySelector('#rocket-smoke');
    // alternate way to query.  DO NOT use the "By" from protractor.
    const rocket = myFixture.debugElement.query(By.css('#rocket-smoke'));

    expect(rocket).toBeTruthy();
  });

  const someObject = { age: 30, name: 'Sam' };
  const anotherObject = { age: 30, name: 'Sam' };
  const referToSameObject = someObject;

  it('should be equivalent', () => {
    expect(someObject).toEqual(referToSameObject);
    expect(someObject.age).toEqual(anotherObject.age);
    expect(someObject).toEqual(anotherObject);
  });

  it('should be the exact same object', () => {
    expect(someObject).toBe(referToSameObject);
    expect(someObject.age).toBe(anotherObject.age);
  });

  it('should not be the same object', () => {
    expect(someObject).not.toBe(anotherObject);
  });

  it(`should have as title 'jasmine-examples'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jasmine-examples');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('jasmine-examples app is running!');
  });
});
