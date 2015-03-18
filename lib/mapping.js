map_Drug_Name = function(anObj) {
    var Drug_Name = anObj.Drug_Name;
    if (Drug_Name == null)
        return;
    var re = /[;\/]/
    // 1. Delete prednisone
    var drugs = anObj.Drug_Name.split(re).filter(function(d) {
        d = d.trim()
		return ! d.match(/Prednisone/);
    }).map(function(s) {
        return s.
            //2. MDV3100
            replace("MDV3100", "Enzalutamide")
            .replace("MDV-3100", "Enzalutamide")
            .replace("MDV 3100", "Enzalutamide")

            // 3. Abiraterone Acetate
            .replace("Abiraterone Acetate", "Abiraterone")

            // 4. Zytiga
            .replace("Zytiga", "Abiraterone")
			.replace("LBH589","Panobinostat")
		
			.replace("BKM120", "Buparlisib")
    });

    var d = drugs.join("; ");

    /*if (anObj.Drug_Name != d) {
        console.log("Drugs before", anObj.Drug_Name, "<"); 
        console.log("Drugs after", d, "<"); 
    }*/
    anObj.Drug_Name = d;
};
map_biopsy_site = function(anObj) {
	var site = anObj.biopsy_site;
	if (site == null)
		return;
	anObj.biopsy_site = site.replace("Lymph nodes", "Lymph node")
};
