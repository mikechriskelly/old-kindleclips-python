import os
import cherrypy


BUILD_DIR = os.path.join(os.path.abspath('.'), u'build')

class KindleClippingsViewer(object):
  @cherrypy.expose
  def index(self):
      return open(os.path.join(BUILD_DIR, u'index.html'))

if __name__ == '__main__':
  conf = {
    '/': {
      'tools.staticdir.on': True,
      'tools.staticdir.dir': BUILD_DIR
    }
  }

  cherrypy.config.update({'server.socket_host': '0.0.0.0',})
  cherrypy.config.update({'server.socket_port': int(os.environ.get('PORT', '5000')),})
  cherrypy.quickstart(KindleClippingsViewer(), '/', conf)