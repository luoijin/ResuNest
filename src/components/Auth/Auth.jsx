import FlipWrapper from './FlipWrapper/FlipWrapper'
import Login from './Login/Login'
import Signup from './Signup/Signup'

const Auth = ({ onLogin }) => {
  return (
    <FlipWrapper>
      <Login onLogin={onLogin} />
      <Signup />
    </FlipWrapper>
  )
}

export default Auth