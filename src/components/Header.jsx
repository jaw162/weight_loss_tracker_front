import { ReactComponent as Sun } from '../icon/sun.svg'
import { ReactComponent as Moon } from '../icon/moon.svg'
import { ReactComponent as GitLogo } from '../icon/gitLogo.svg'
import styles from '../styles/Header.module.css'

export default function Header({ dark, setDark, user, handleLogout }) {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles['sub-header']}>
          <div className={styles['github-links']}>
            <GitLogo />
            <h4>
              <a href='https://github.com/jaw162/weight_loss_tracker_front'>Front</a> | <a href='https://github.com/jaw162/weight_loss_tracker_back'>Back</a>
            </h4>
          </div>
          <div className={styles.user}>
            <p>Welcome {user.user}, 
            <span 
            onClick={handleLogout}
            style={{ fontWeight: '800' }}
            > Log Out?</span></p>
          </div>
        </div>
        <div className={styles['header-main']}>
            <h1>Weight Tracker</h1>
            <div className={styles.buttons}>
                {/* <button>Generate</button>
                <button>Reset</button> */}
                <div className={styles['dark-mode-toggle']}>
                <Sun />
                <button 
                    className={styles.button}
                    onClick={() => setDark(!dark)}
                >
                    <span
                    style={dark ? { transform: 'translateX(140%)' } : null}
                    ></span>
                </button>
                <Moon />
                </div>
            </div>
        </div>
      </div>
    </header>
  )
}