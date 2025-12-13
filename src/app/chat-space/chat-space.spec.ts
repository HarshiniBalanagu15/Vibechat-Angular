import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSpace } from './chat-space';

describe('ChatSpace', () => {
  let component: ChatSpace;
  let fixture: ComponentFixture<ChatSpace>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSpace]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSpace);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
