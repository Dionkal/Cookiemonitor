# Cookie Monitor #

## Prerequisites: ##
- NodeJS & npm: ```https://www.npmjs.com/get-npm ```

- Disable same origin policy         

        Open the Firefox config by navigating to about:config
        Set the option security.fileuri.strict_origin_policy to false
        
  <i><b>Note:</b> This feature will make firefox <b>unsecure</b>. Do it at your own risk.</i>
## Installation: ##
1. <b> Download the repo </b>

        $ git clone https://gitlab.com/Dennis_Kalo/cookiemonitor.git
        $ cd cookiemonitor/

2. <b> Install dependencies </b>
    
        $ npm install

3. <b> Build the project </b> 

        $ npm run build

4. <b> Load the extention to the browser </b>
    
    Go to ``` about:debugging ``` in firefox and click ``` Load temporary Add-on ```.<br>
    Select and load the <b>manifest.json</b> file of the project.