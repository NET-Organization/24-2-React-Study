import { useState } from 'react';
import dummyData from './dummyData.js';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = dummyData.filter((item) => 
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const onSearch = (term) =>{
        setSearchTerm(term)
      }
    
    return (
        <>
            <div className={styles["list-component-container"]}>
                <ListSearch searchTerm={searchTerm} onSearch={onSearch} />
            </div>
            <section className={styles["list-list-container"]}>
                {filteredData && filteredData.length > 0 ? (
                    <div className={styles["list-list-box-container"]}>
                        {filteredData.map((el) => {
                            return <ListBox key={el.type} {...el} />;
                        })}
                    </div>
                ) : (
                    <span className={styles["list-no-search-result"]}>검색 결과가 없습니다.</span>
                )}
            </section>

        </>
    )
};

export default Search;
