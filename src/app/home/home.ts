import { Component, VERSION } from '@angular/core';
import { version } from 'os';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  clicked = false;
  ohio = `testing this kinna hero section`
  title = `Angular ${VERSION.full} is red!`

  boat = {
    name: 'Starfire',
    year: 1977,
    img: '/striking.jpg'

  }

  handleClick(){
    this.clicked = true;
  }
  
}
