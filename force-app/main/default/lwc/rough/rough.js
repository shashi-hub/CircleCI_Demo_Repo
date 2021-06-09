import { LightningElement } from "lwc";
import { loadScript } from "lightning/platformResourceLoader"; 
import roughjs from "@salesforce/resourceUrl/roughJs"; 
export default class Rough extends LightningElement {
    connectedCallback(){
        Promise.all([
            loadScript(this, roughjs )
          ]).then(() => {
         console.log('Loaded')
        })
        .catch(error => {
            console.error({
              message: 'Error occured on rough',
              error
            });
          })
    }
     handleRectangle() { 
         loadScript(this, roughjs).then(() => { 
             console.log(rough);
             const rc = rough.canvas(this.template.querySelector(".canvas")); 
             rc.rectangle(10, 10, 200, 200, { fill: "blue" }); // x, y, width, height 
            });
         }
             handleCircle() {
                  loadScript(this, roughjs).then(()  => { 
                      const rc = rough.canvas(this.template.querySelector(".canvas")); 
                      rc.circle(50, 50, 80, { fill: "red" });
                  });
                }
                handlePath() { 
                    loadScript(this, roughjs).then(() => {
                         const rc = rough.canvas(this.template.querySelector(".canvas"));
                          rc.path("M80 80 A 45 45, 0, 0, 0, 125 125 L 125 80 Z", {
                               fill: "green" 
                            }); 
                        }); 
                    }
                } 
