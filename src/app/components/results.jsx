import React ,{useEffect, useState} from 'react'

function Results({ data }) {
      // remove extra direcotories show in file name
      function remove_extras(string) {
            if (RegExp(/[\\]/).test(string)) { 
                  console.log(string);
                  let item = string.split("\\");
                  console.log(item);
                  return item[item.length - 1];
            }
            return string;
      }
  return (
        <div>{
              data["top_matches"].map((match, index) => {
                    return (
                        <div key={index} className="p-1 mb-1 border border-gray-700 rounded-lg bg-white/5">
                              <div className="text-sm">Match {index + 1}</div>
                                <div className="text-xs mb-1"><span className="font-semibold">ID:</span> {
                                      remove_extras(match["matched_filename"])
                                }</div>
                                <div className="text-xs">similarity: {match["overall_similarity"]}</div>
                        </div>
                    )
              })
      }</div>
  )
}

export default Results