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
  cherrypy.quickstart(KindleClippingsViewer(), '/', conf)