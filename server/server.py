import os
import cherrypy
from dropbox import DropboxOAuth2Flow
import dropbox
import parse

BUILD_DIR = os.path.join(os.path.abspath('.'), u'build')
DROPBOX_KEY = os.environ.get('DROPBOX_KEY')
DROPBOX_SECRET = os.environ.get('DROPBOX_SECRET')
MY_CLIPPINGS = '/My Clippings.txt'

class Root:
  def get_dropbox_auth_flow(self):
    redirect_uri = cherrypy.url('/setup')
    web_app_session = cherrypy.session
    
    return DropboxOAuth2Flow(
        DROPBOX_KEY,
        DROPBOX_SECRET, 
        redirect_uri, 
        web_app_session,
        'dropbox-auth-csrf-token')

  def file_in_dropbox(self, filename):
    sess = cherrypy.session
    try:
      dbx = dropbox.Dropbox(sess['access_token'])
      meta = dbx.files_get_metadata(filename)
      return True
    except:
      return False

  @cherrypy.expose
  def index(self):
    return open(os.path.join(BUILD_DIR, u'index.html'))

  @cherrypy.expose
  def login(self):
    cherrypy.session.regenerate()
    authorize_url = self.get_dropbox_auth_flow().start()
    raise cherrypy.HTTPRedirect(authorize_url)

  @cherrypy.expose
  def setup(self, **params):
    sess = cherrypy.session
    if not sess.has_key('access_token'):
      try:
        # Get access token from auth flow
        sess['access_token'], sess['user_id'], sess['url_state'] = \
          self.get_dropbox_auth_flow().finish(cherrypy.request.params)
      except:
        # Start over. Redirect to landing page
        raise cherrypy.HTTPRedirect('/')
      
      # Redirect to self to clear query parameters
      raise cherrypy.HTTPRedirect('/setup')

    if self.file_in_dropbox(MY_CLIPPINGS):
      # Can skip to main app
      raise cherrypy.HTTPRedirect('/clips')

    return open(os.path.join(BUILD_DIR, u'index.html'))

  @cherrypy.expose
  def clips(self):
    sess = cherrypy.session
    if not sess.has_key('access_token'):
      raise cherrypy.HTTPRedirect('/')
    
    return open(os.path.join(BUILD_DIR, u'index.html'))


class API:
  @cherrypy.expose
  def count(self):
    sess = cherrypy.session
    try:
      sess['counter'] += 1
    except:
      sess['counter'] = 0
    return str(sess['counter'])

  @cherrypy.expose
  @cherrypy.tools.json_out()
  def clips(self):
    sess = cherrypy.session
    dbx = dropbox.Dropbox(sess['access_token'])
    meta, res = dbx.files_download(MY_CLIPPINGS)
    return parse.parse_clips(res.content)

  @cherrypy.expose
  def topics(self):
    sess = cherrypy.session
    # Create dropbox client
    # Read My Clippings from DB
    # Run LDA processing
    # Return topics
    return 'TODO'   

def main():
  root = Root()
  root.api = API()

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
  cherrypy.config.update({'server.socket_port': int(os.environ.get('PORT', '8000')),})
  cherrypy.tree.mount(root, '/', conf)
  cherrypy.engine.start()
  cherrypy.engine.block()

if __name__ == '__main__':
  main()