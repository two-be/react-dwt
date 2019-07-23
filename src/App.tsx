import React from "react"
import * as Dynamsoft from "dwt"

import "./App.css"
import dwtConfig from "./dwt/dynamsoft.webtwain.config"

type State = {
  scan: boolean
}

export default class App extends React.Component<{}, State> {

  DWObject!: WebTwain;

  constructor(props: any) {
    super(props)
    this.state = {
      scan: true
    }
  }

  componentDidMount = () => {
    this.initScan()
  }

  download = () => {
    this.DWObject.RemoveAllImages()
    this.DWObject.HTTPDownload("asp.demosoft.me", "api/files/fileName/TestImage.pdf", () => {
      console.log("Success")
    }, (code, message) => {
      console.log(code)
      console.log(message)
    })
  }

  Dynamsoft_OnReady(): void {
    this.DWObject = Dynamsoft.WebTwainEnv.GetWebTwain("dwtcontrolContainer")
    if (this.DWObject) {
      this.DWObject.Width = 200
      this.DWObject.Height = 600
      this.DWObject.ShowImageEditor("dwtcontrolContainerLargeViewer", 800, 600)
      this.DWObject.SetViewMode(1, 4)
    }
  }

  initScan = () => {
    this.setState({scan: false}, () => {
      this.setState({scan: true}, () => {
        dwtConfig.applyConfig(Dynamsoft)
        Dynamsoft.WebTwainEnv.RegisterEvent("OnWebTwainReady", () => { this.Dynamsoft_OnReady() })
        Dynamsoft.WebTwainEnv.Load()
      })
    })
  }

  upload = () => {
    let strHTTPServer = "asp.demosoft.me"
    let uploadfilename = "TestImage.pdf"
    this.DWObject.HTTPUploadAllThroughPostAsPDF(strHTTPServer, "api/files", uploadfilename, () => {
      console.log("Success")
    }, (code, message) => {
      console.log(code)
      console.log(message)
    })
  }

  render = () => {
    return (
      <div className="App">
        <div>
          <button onClick={this.initScan}>Init</button>
          <button onClick={this.download}>Download</button>
          <button onClick={this.upload}>Upload</button>
        </div>
        {
          this.state.scan &&
          <div>
            <div id="dwtcontrolContainer" style={{ float: "left", marginRight: "20px" }}></div>
            <div id="dwtcontrolContainerLargeViewer" style={{ float: "left" }}></div>
          </div>
        }
      </div>
    )
  }
}
