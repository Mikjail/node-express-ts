import { Request, Response } from 'express';
import { get, controller, use, post, bodyValidator } from './decorators';
import { NextFunction } from 'connect';

function logger( req: Request, res: Response, next: NextFunction){
  console.log("request made!!!");
  next();
}


@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void{
      res.send(`
        <form method="POST">
          <div>
            <label> Email </label>
            <input name="email"/>
          </div>
          <div>
            <label> Password </label>
            <input name="password"/>
          </div>
          <button> Submit </button>
        </form>
      `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  routePostLogin(req: Request, res: Response) {
    const { email, password}  = req.body;
    
    if( email && password && email == 'user@example.com' && password == 'password'){
      // Marking logged in
      req.session = { loggedIn: true };
      // Redirection to home
      res.redirect('/');
    }else{
      res.send('Invalid Email or Password');
    }
    
  }

  @get('/logout')
  routeGetLogout(req: Request, res: Response){
    req.session = undefined;
    res.redirect('/');
  }
};

