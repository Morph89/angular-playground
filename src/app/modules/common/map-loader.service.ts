declare var window: any;

export function MapLoaderService(): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise((resolve, reject) => {
      window['__onGapiLoaded'] = (ev) => {
        console.log('gapi loaded')
        resolve(window.gapi);
      };


      const node = document.createElement('script');
      node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAbWJL5AjAp6wSa0Xb0POuxHhaJxf02E9o&callback=__onGapiLoaded';
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);

    });
  };
}