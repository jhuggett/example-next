import Cookies from 'cookies'

const preview = (req: any, res: any) => {

  const token = (req.headers['authorization'] || '').split(' ')[1] || null

  res.setPreviewData({})

  const cookies = new Cookies(req, res)
  cookies.set('tinaio_token', token, {
    httpOnly: true
  })

res.end('Preview mode enabled')

}

export default preview