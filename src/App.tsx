/// <reference types="dwt" />
import React from "react"
import logo from "./logo.svg"
import "./App.css"

class App extends React.Component<{}, {}> {

  DWObject: WebTwain | undefined

  constructor() {
    super({})
  }

  componentDidMount() {
    Dynamsoft.WebTwainEnv.AutoLoad = false
    Dynamsoft.WebTwainEnv.Containers = [{ ContainerId: "dwtcontrolContainer", Width: "583px", Height: "513px" }]
    Dynamsoft.WebTwainEnv.RegisterEvent("OnWebTwainReady", () => { this.Dynamsoft_OnReady() })
    /**
     * In order to use the full version, do the following
     * 1. Change Dynamsoft.WebTwainEnv.Trial to false
     * 2. Replace A-Valid-Product-Key with a full version key
     * 3. Change Dynamsoft.WebTwainEnv.ResourcesPath to point to the full version 
     *    resource files that you obtain after purchasing a key
     */
    Dynamsoft.WebTwainEnv.Trial = true
    Dynamsoft.WebTwainEnv.ProductKey = "t0127vQIAACgBkEYzFunCvWBIR9kHQdX3QyyTpRi1oM/GeUqaUc0aDxuT5AcXkTB0X/z859xm7Wtjw5uChAsCPQvHgpD1duFZD1Ff2GF6+khgtPXXchj/MKu85pJGnzzjQrHRDuOxYZhH0ZrdEGe+jXYYjw3DPP+Zs82wJLIDH8mIUg=="
    //Dynamsoft.WebTwainEnv.ResourcesPath = "https://tst.dynamsoft.com/libs/dwt/15.0"

    Dynamsoft.WebTwainEnv.Load()
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain("dwtcontrolContainer")
    if (this.DWObject) {
      this.DWObject.Addon.PDF.SetResolution(300);
      this.DWObject.Addon.PDF.SetConvertMode(EnumDWT_ConvertMode.CM_RENDERALL);
      this.DWObject.Height = 600
      this.DWObject.SetViewMode(1, 4)
      this.DWObject.ShowImageEditor("dwtcontrolContainerLargeViewer", 850, 600)
      this.DWObject.ShowPageNumber = true
      this.DWObject.Width = 200
    }
  }

  render() {
    return (
      <div className="App">
        <div id="dwtcontrolContainer" style={{ float: "left", marginRight: "20px" }}></div>
        <div id="dwtcontrolContainerLargeViewer" style={{ float: "left" }}></div>
      </div>
    )
  }
}

export default App
