import os
import cherrypy
from dropbox import DropboxOAuth2Flow
from test import test

BUILD_DIR = os.path.join(os.path.abspath('.'), u'build')
DROPBOX_KEY = os.environ.get('DROPBOX_KEY')
DROPBOX_SECRET = os.environ.get('DROPBOX_SECRET')

class KindleClippingsViewer(object):

  def get_dropbox_auth_flow(self):
    redirect_uri = cherrypy.url('clips')
    web_app_session = cherrypy.session
    
    return DropboxOAuth2Flow(
        DROPBOX_KEY,
        DROPBOX_SECRET, 
        redirect_uri, 
        web_app_session,
        'dropbox-auth-csrf-token')

  @cherrypy.expose
  def index(self):
    return open(os.path.join(BUILD_DIR, u'index.html'))

  @cherrypy.expose
  def login(self):
    cherrypy.session.regenerate()

    authorize_url = self.get_dropbox_auth_flow().start()
    raise cherrypy.HTTPRedirect(authorize_url)

  @cherrypy.expose
  def clips(self, **params):

    sess = cherrypy.session
    if sess.has_key('access_token'):
      return sess['user_id']
    elif 'state' not in params:
      raise cherrypy.HTTPRedirect('login')
    else:

      sess['access_token'], sess['user_id'], sess['url_state'] = \
        self.get_dropbox_auth_flow().finish(cherrypy.request.params)

      return sess['user_id']


if __name__ == '__main__':
  conf = {
    '/': {
      'tools.staticdir.on': True,
      'tools.staticdir.dir': BUILD_DIR,
      'tools.sessions.on': True,
      'tools.sessions.timeout': 60,
      'log.screen': True
    }
  }

  cherrypy.config.update({'server.socket_host': '0.0.0.0',})
  cherrypy.config.update({'server.socket_port': int(os.environ.get('PORT', '8080')),})
  cherrypy.quickstart(KindleClippingsViewer(), '/', conf)