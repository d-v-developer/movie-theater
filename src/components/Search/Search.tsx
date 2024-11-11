import cn from 'classnames';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import { forwardRef } from 'react';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({isValid, ...props }, ref) {
    return (
      <div className={styles.wrapper}>
          <img src="/search-icon.svg" alt="icon search" className={styles.image}/>
          <input ref={ref} {...props} className={cn(styles.input, {
            [styles.isValid]: !isValid 
          })}/>
      </div>
    );
  }
)

export default Search;
